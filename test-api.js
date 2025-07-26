const testAPI = async () => {
  try {
    const res = await fetch(
      "https://api.10minuteschool.com/discovery-service/api/v1/products/ielts-course?lang=en",
      {
        headers: {
          "X-TENMS-SOURCE-PLATFORM": "web",
          accept: "application/json",
        },
      },
    );
    const data = await res.json();

    console.log("Media items:");
    data.data.media.forEach((item, i) => {
      console.log(`${i}: ${item.name} - ${item.resource_type}`);
      if (item.resource_type === "video") {
        console.log(`  Video URL: ${item.resource_value}`);
      }
    });
  } catch (err) {
    console.error("Error:", err);
  }
};

testAPI();
