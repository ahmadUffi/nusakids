export class ApiService {
  static async generateText(request) {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/chat/generate-text`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to generate text");
    }

    return response.json();
  }

  static async generateAudio(request) {
    console.log("Requesting audio for text:", request.text);

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/chat/generate-audio`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: request.text,
          voice: request.voice || "Despina",
        }),
      }
    );

    if (!response.ok) {
      const text = await response.text();
      console.error("Audio API Error:", text.code);
      throw new Error(`Failed to generate audio: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    console.log("Response content-type:", contentType);

    const blob = await response.blob();
    console.log("Audio blob size:", blob.size, "type:", blob.type);

    if (blob.size < 1000) {
      console.warn("Audio blob seems too small:", blob.size, "bytes");
    }

    return blob;
  }

  static async generateImageFromTextAndImage({ image_base64, province }) {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/chat/generate-image-from-text-and-image`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image_base64,
          province,
        }),
      }
    );

    if (!response.ok) {
      const text = await response.text();
      console.error("Image API Error:", text);
      throw new Error("Failed to generate image");
    }
    const result = await response.json();

    return result;
  }

  static async generateImage(request) {
    console.log("Requesting image generation for prompt:", request.prompt);

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/chat/generate-image`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: request.prompt,
          province: request.province,
        }),
      }
    );

    if (!response.ok) {
      const text = await response.text();
      console.error("Image API Error:", text);
      throw new Error(`Failed to generate image: ${response.status}`);
    }

    const result = await response.json();
    console.log("Image generation result:", result);

    return result;
  }

  static async getAllDatas() {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/budaya`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      console.log(await response.text());
      throw new Error("Failed to fetch data");
    }

    return await response.json();
  }

  static async getDataBySlug(slug) {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/budaya/${slug}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return await response.json();
  }
}
