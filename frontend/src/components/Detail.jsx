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
    title2: "MEGALITIKUM GUNUNG PADANG",
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
        cardHeight: 180,
        gap: 20,
        detailsLeft: 20,
        detailsTop: height * 0.4,
        descWidth: width - 40,
      };
    } else if (isTablet) {
      return {
        offsetTop: height - 350,
        offsetLeft: width - 650,
        cardWidth: 160,
        cardHeight: 240,
        gap: 30,
        detailsLeft: 40,
        detailsTop: 240,
        descWidth: 450,
      };
    } else {
      return {
        offsetTop: height - 430,
        offsetLeft: width - 830,
        cardWidth: 200,
        cardHeight: 300,
        gap: 40,
        detailsLeft: 60,
        detailsTop: 240,
        descWidth: 500,
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
        top: offsets.offsetTop + offsets.cardHeight + 30,
        left: offsets.offsetLeft,
        y: 200,
        opacity: 0,
        zIndex: 60,
      });
      gsap.set("nav", { y: -200, opacity: 0 });

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
      <nav>
        <div>
          <div className="svg-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
              />
            </svg>
          </div>
          <div>NusaKids</div>
        </div>
        <div>
          <div className="active">Beranda</div>
          <div>Budaya</div>
          <div>Destinasi</div>
          <div>Cerita</div>
          <div>Permainan</div>
          <div>Kontak</div>
          <div className="svg-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
          <div className="svg-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </nav>

      <div id="demo">
        {data.map((item, index) => (
          <div key={index}>
            <div
              className="card"
              id={`card${index}`}
              style={{ backgroundImage: `url(${item.image})` }}
            ></div>
            <div className="card-content" id={`card-content-${index}`}>
              <div className="content-start"></div>
              <div className="content-place">{item.place}</div>
              <div className="content-title-1">{item.title}</div>
              <div className="content-title-2">{item.title2}</div>
            </div>
          </div>
        ))}
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
          <button className="bookmark">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                clipRule="evenodd"
              />
            </svg>
          </button>
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
          <button className="bookmark">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button className="discover">Jelajahi Lokasi</button>
        </div>
      </div>

      <div className="pagination" id="pagination">
        <div className="arrow arrow-left" onClick={handlePrev}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </div>
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
        <div className="progress-sub-container">
          <div className="progress-sub-background">
            <div className="progress-sub-foreground"></div>
          </div>
        </div>
        <div className="slide-numbers" id="slide-numbers">
          {data.map((_, index) => (
            <div className="item" id={`slide-item-${index}`} key={index}>
              {index + 1}
            </div>
          ))}
        </div>
      </div>

      <div className="cover"></div>
    </div>
  );
};

export default Detail;
