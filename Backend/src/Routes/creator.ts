export const uploadVideo = async (req: any, res: any) => {
  const { type } = req.body;

  try {
    let cloudName: string = "dp6puihqw";
    let resourceType: string = type === "image" ? "image" : "video";
    let url: string = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

    // const response = await fetch(url, {
    //   method: "POST",
    //   headers: { Application: undefined },
    //   body: file,
    // }).then((res) => res.json());

    // console.log(response);
    res.status(200).json({
      secure_url:
        "https://res.cloudinary.com/dp6puihqw/image/upload/v1633940733/ytb",
    });
  } catch (error) {
    console.log(error);
  }
};
