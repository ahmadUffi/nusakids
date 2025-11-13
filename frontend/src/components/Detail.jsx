import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./Detail.css";
import ModelViewer from "./ModelViewer";
import { LightRays } from "./ui/light-rays";
import useResponsive from "../hooks/useResponsive";

const data = [
  {
    place: "Jawa Tengah - Indonesia",
    title: "CANDI",
    title2: "BOROBUDUR",
    description:
      "Candi Borobudur adalah candi Buddha terbesar di dunia yang terletak di Magelang, Jawa Tengah. Dibangun pada abad ke-9, candi ini memiliki arsitektur megah dengan 2.672 panel relief dan 504 arca Buddha. Borobudur menjadi destinasi wisata spiritual dan budaya yang menakjubkan.",
    image:
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80",
  },
  {
    place: "Bali - Indonesia",
    title: "PURA",
    title2: "TANAH LOT",
    description:
      "Pura Tanah Lot adalah pura Hindu yang terletak di atas batu karang besar di tepi laut. Pura ini menjadi salah satu ikon Bali yang paling terkenal dengan pemandangan sunset yang memukau. Tanah Lot memiliki nilai spiritual tinggi bagi umat Hindu Bali.",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
  },
  {
    place: "Yogyakarta - Indonesia",
    title: "KERATON",
    title2: "YOGYAKARTA",
    description:
      "Keraton Yogyakarta atau Kraton Ngayogyakarta Hadiningrat adalah istana resmi Kesultanan Yogyakarta. Keraton ini menjadi pusat kebudayaan Jawa dengan arsitektur tradisional yang indah, museum, dan pertunjukan seni budaya seperti tari dan gamelan.",
    image:
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800&q=80",
  },
  {
    place: "Jawa Barat - Indonesia",
    title: "SITUS",
    title2: " GUNUNG PADANG",
    description:
      "Gunung Padang adalah situs megalitikum terbesar di Asia Tenggara yang terletak di Cianjur, Jawa Barat. Situs ini memiliki struktur batu purba yang tersusun rapi dan dipercaya memiliki nilai sejarah yang sangat penting bagi peradaban Nusantara.",
    image:
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&q=80",
  },
  {
    place: "Sumatera Barat - Indonesia",
    title: "RUMAH",
    title2: "GADANG",
    description:
      "Rumah Gadang adalah rumah adat Minangkabau yang memiliki atap berbentuk tanduk kerbau. Rumah ini merupakan simbol kebudayaan Minangkabau dengan ukiran kayu yang indah dan filosofi yang mendalam tentang kehidupan masyarakat Minang.",
    image:
      "https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?w=800&q=80",
  },
  {
    place: "Nusa Tenggara Timur - Indonesia",
    title: "PULAU",
    title2: "KOMODO",
    description:
      "Pulau Komodo adalah rumah bagi komodo, hewan purba terbesar di dunia. Pulau ini menjadi Taman Nasional Komodo yang dilindungi UNESCO dengan pemandangan alam yang eksotis, pantai pink, dan keanekaragaman hayati laut yang luar biasa.",
    image:
      "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&q=80",
  },
];

const Detail = () => {
  const [order, setOrder] = useState([0, 1, 2, 3, 4, 5]);
  const [detailsEven, setDetailsEven] = useState(true);
  const [clicks, setClicks] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const animating = useRef(false);
  const loopTimeout = useRef(null);
  const { deviceName } = useResponsive();

  const getCard = (index) => `#card${index}`;
  const getCardContent = (index) => `#card-content-${index}`;
  const getSliderItem = (index) => `#slide-item-${index}`;

  const ease = "sine.inOut";
  const cardWidth = 200;
  const cardHeight = 300;
  const gap = 40;
  const numberSize = 50;

  // Calculate responsive offsets
  const getOffsets = () => {
    const { innerHeight: height, innerWidth: width } = window;
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;

    if (isMobile) {
      return {
        offsetTop: height - 250,
        offsetLeft: 20,
        cardWidth: 120,
        cardHeight: 140,
        gap: 20,
        detailsLeft: 20,
        detailsTop: 20,
        descWidth: width - 40,
        paginationTop: height - 80,
        paginationLeft: 20,
      };
    } else if (isTablet) {
      return {
        offsetTop: height - 350,
        offsetLeft: width - 650,
        cardWidth: 150,
        cardHeight: 190,
        gap: 30,
        detailsLeft: 40,
        detailsTop: 200,
        descWidth: 450,
        paginationTop: height - 350,
        paginationLeft: width - 650,
      };
    } else {
      return {
        offsetTop: height - 220,
        offsetLeft: 830,
        cardWidth: 160,
        cardHeight: 200,
        gap: 40,
        detailsLeft: 60,
        detailsTop: 200,
        descWidth: 500,
        paginationTop: height - 125,
        paginationLeft: 750,
      };
    }
  };
  useEffect(() => {
    // Load all images first
    const loadImages = async () => {
      try {
        const promises = data.map(
          ({ image }) =>
            new Promise((resolve, reject) => {
              const img = new Image();
              img.onload = () => resolve(img);
              img.onerror = reject;
              img.src = image;
            })
        );
        await Promise.all(promises);
        setImagesLoaded(true);
      } catch (error) {
        console.error("One or more images failed to load", error);
        setImagesLoaded(true); // Continue anyway
      }
    };

    loadImages();

    return () => {
      if (loopTimeout.current) {
        clearTimeout(loopTimeout.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;

    const init = () => {
      const [active, ...rest] = order;
      const detailsActive = detailsEven ? "#details-even" : "#details-odd";
      const detailsInactive = detailsEven ? "#details-odd" : "#details-even";
      const { innerHeight: height, innerWidth: width } = window;
      const offsets = getOffsets();

      gsap.set("#pagination", {
        top: offsets.paginationTop,
        left: offsets.paginationLeft,
        y: 200,
        opacity: 0,
        zIndex: 60,
      });

      gsap.set(getCard(active), {
        x: 0,
        y: 0,
        width: width,
        height: height,
      });
      gsap.set(getCardContent(active), { x: 0, y: 0, opacity: 0 });
      gsap.set(detailsActive, {
        opacity: 0,
        zIndex: 22,
        x: -200,
        left: offsets.detailsLeft,
        top: offsets.detailsTop,
      });
      gsap.set(detailsInactive, { opacity: 0, zIndex: 12 });
      gsap.set(`${detailsInactive} .text`, { y: 100 });
      gsap.set(`${detailsInactive} .title-1`, { y: 100 });
      gsap.set(`${detailsInactive} .title-2`, { y: 100 });
      gsap.set(`${detailsInactive} .desc`, { y: 50 });
      gsap.set(`${detailsInactive} .cta`, { y: 60 });

      gsap.set(".progress-sub-foreground", {
        width: offsets.descWidth * (1 / order.length) * (active + 1),
      });

      rest.forEach((i, index) => {
        gsap.set(getCard(i), {
          x:
            offsets.offsetLeft +
            400 +
            index * (offsets.cardWidth + offsets.gap),
          y: offsets.offsetTop,
          width: offsets.cardWidth,
          height: offsets.cardHeight,
          zIndex: 30,
          borderRadius: 10,
        });
        gsap.set(getCardContent(i), {
          x:
            offsets.offsetLeft +
            400 +
            index * (offsets.cardWidth + offsets.gap),
          zIndex: 40,
          y: offsets.offsetTop + offsets.cardHeight - 100,
        });
        gsap.set(getSliderItem(i), { x: (index + 1) * numberSize });
      });

      gsap.set(".indicator", { x: -width });

      const startDelay = 0.6;

      gsap.to(".cover", {
        x: width + 400,
        delay: 0.5,
        ease,
      });

      rest.forEach((i, index) => {
        gsap.to(getCard(i), {
          x: offsets.offsetLeft + index * (offsets.cardWidth + offsets.gap),
          zIndex: 30,
          delay: 0.05 * index + startDelay,
          ease,
        });
        gsap.to(getCardContent(i), {
          x: offsets.offsetLeft + index * (offsets.cardWidth + offsets.gap),
          zIndex: 40,
          delay: 0.05 * index + startDelay,
          ease,
        });
      });

      gsap.to("#pagination", { y: 0, opacity: 1, ease, delay: startDelay });
      gsap.to("nav", { y: 0, opacity: 1, ease, delay: startDelay });
      gsap.to(detailsActive, { opacity: 1, x: 0, ease, delay: startDelay });
    };

    init();
  }, [imagesLoaded]);

  const step = () => {
    if (animating.current) return;
    animating.current = true;

    const newOrder = [...order];
    newOrder.push(newOrder.shift());
    setOrder(newOrder);

    const newDetailsEven = !detailsEven;
    setDetailsEven(newDetailsEven);

    const detailsActive = newDetailsEven ? "#details-even" : "#details-odd";
    const detailsInactive = newDetailsEven ? "#details-odd" : "#details-even";
    const offsets = getOffsets();

    // Update content
    const activeData = data[newOrder[0]];
    document.querySelector(`${detailsActive} .place-box .text`).textContent =
      activeData.place;
    document.querySelector(`${detailsActive} .title-1`).textContent =
      activeData.title;
    document.querySelector(`${detailsActive} .title-2`).textContent =
      activeData.title2;
    document.querySelector(`${detailsActive} .desc`).textContent =
      activeData.description;

    gsap.set(detailsActive, { zIndex: 22 });
    gsap.to(detailsActive, { opacity: 1, delay: 0.4, ease });
    gsap.to(`${detailsActive} .text`, {
      y: 0,
      delay: 0.1,
      duration: 0.7,
      ease,
    });
    gsap.to(`${detailsActive} .title-1`, {
      y: 0,
      delay: 0.15,
      duration: 0.7,
      ease,
    });
    gsap.to(`${detailsActive} .title-2`, {
      y: 0,
      delay: 0.15,
      duration: 0.7,
      ease,
    });
    gsap.to(`${detailsActive} .desc`, {
      y: 0,
      delay: 0.3,
      duration: 0.4,
      ease,
    });
    gsap.to(`${detailsActive} .cta`, {
      y: 0,
      delay: 0.35,
      duration: 0.4,
      ease,
    });
    gsap.set(detailsInactive, { zIndex: 12 });

    const [active, ...rest] = newOrder;
    const prv = rest[rest.length - 1];

    gsap.set(getCard(prv), { zIndex: 10 });
    gsap.set(getCard(active), { zIndex: 20 });
    gsap.to(getCard(prv), { scale: 1.5, ease });

    gsap.to(getCardContent(active), {
      y: offsets.offsetTop + offsets.cardHeight - 10,
      opacity: 0,
      duration: 0.3,
      ease,
    });
    gsap.to(getSliderItem(active), { x: 0, ease });
    gsap.to(getSliderItem(prv), { x: -numberSize, ease });
    gsap.to(".progress-sub-foreground", {
      width: offsets.descWidth * (1 / order.length) * (active + 1),
      ease,
    });

    gsap.to(getCard(active), {
      x: 0,
      y: 0,
      ease,
      width: window.innerWidth,
      height: window.innerHeight,
      borderRadius: 0,
      onComplete: () => {
        const xNew =
          offsets.offsetLeft +
          (rest.length - 1) * (offsets.cardWidth + offsets.gap);
        gsap.set(getCard(prv), {
          x: xNew,
          y: offsets.offsetTop,
          width: offsets.cardWidth,
          height: offsets.cardHeight,
          zIndex: 30,
          borderRadius: 10,
          scale: 1,
        });

        gsap.set(getCardContent(prv), {
          x: xNew,
          y: offsets.offsetTop + offsets.cardHeight - 100,
          opacity: 1,
          zIndex: 40,
        });
        gsap.set(getSliderItem(prv), { x: rest.length * numberSize });

        gsap.set(detailsInactive, { opacity: 0 });
        gsap.set(`${detailsInactive} .text`, { y: 100 });
        gsap.set(`${detailsInactive} .title-1`, { y: 100 });
        gsap.set(`${detailsInactive} .title-2`, { y: 100 });
        gsap.set(`${detailsInactive} .desc`, { y: 50 });
        gsap.set(`${detailsInactive} .cta`, { y: 60 });

        animating.current = false;
      },
    });

    rest.forEach((i, index) => {
      if (i !== prv) {
        const xNew =
          offsets.offsetLeft + index * (offsets.cardWidth + offsets.gap);
        gsap.set(getCard(i), { zIndex: 30 });
        gsap.to(getCard(i), {
          x: xNew,
          y: offsets.offsetTop,
          width: offsets.cardWidth,
          height: offsets.cardHeight,
          ease,
          delay: 0.1 * (index + 1),
        });

        gsap.to(getCardContent(i), {
          x: xNew,
          y: offsets.offsetTop + offsets.cardHeight - 100,
          opacity: 1,
          zIndex: 40,
          ease,
          delay: 0.1 * (index + 1),
        });
        gsap.to(getSliderItem(i), { x: (index + 1) * numberSize, ease });
      }
    });
  };

  const loop = async () => {
    // Auto-loop disabled - manual navigation only
  };

  const handleNext = () => {
    if (animating.current) return;
    step();
  };

  const handlePrev = () => {
    if (animating.current) return;
    // Reverse the order
    const newOrder = [...order];
    newOrder.unshift(newOrder.pop());
    setOrder(newOrder);
    step();
  };

  return (
    <div className="detail-container">
      <div id="demo">
        <div className="">
          {data.map((item, index) => (
            <div key={index}>
              <div
                className="card"
                id={`card${index}`}
                style={{ backgroundImage: `url(${item.image})` }}
              ></div>
              <div
                className="card-content overflow-hidden"
                id={`card-content-${index}`}
              >
                <div className="content-start"></div>
                {/* <div className="content-place">{item.place}</div> */}
                <div className="content-title-1 truncate block w-full">
                  {item.title}
                </div>
                <div className="content-title-2 truncate block w-full">
                  {item.title2}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="details" id="details-even">
        <div className="place-box">
          <div className="text">{data[0].place}</div>
        </div>
        <div className="title-box-1">
          <div className="title-1">{data[0].title}</div>
        </div>
        <div className="title-box-2">
          <div className="title-2">{data[0].title2}</div>
        </div>
        <div className="desc">{data[0].description}</div>
        <div className="cta">
          <button className="discover">Lihat Gambar 3D</button>
          <button className="discover">Jelajahi Lokasi</button>
        </div>
      </div>

      <div className="details" id="details-odd">
        <div className="place-box">
          <div className="text">{data[0].place}</div>
        </div>
        <div className="title-box-1">
          <div className="title-1">{data[0].title}</div>
        </div>
        <div className="title-box-2">
          <div className="title-2">{data[0].title2}</div>
        </div>
        <div className="desc">{data[0].description}</div>
        <div className="cta">
          <button className="discover">Lihat Gambar 3D</button>
          <button className="discover">Jelajahi Lokasi</button>
        </div>

        <div className="left">
          <h1>llalal</h1>
        </div>
      </div>

      <div className="pagination" id="pagination">
        <div className="arrow arrow-right" onClick={handleNext}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </div>

      <div className="cover"></div>
    </div>
  );
};

export default Detail;
