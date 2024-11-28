import Testimonial from "@/app/models/testimonial.model";
import connectToDb from "@/lib/connetToDb";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const spaceId = searchParams.get("spaceId");

    if (!spaceId) {
        return new Response('console.error("Invalid spaceId");', {
            status: 400,
            headers: {
                "Content-Type": "application/javascript", // Return JavaScript
            },
        });
    }

    try {
        await connectToDb();
        console.log({ spaceId })
        const testimonials = await Testimonial.find({ spaceId: spaceId });
        console.log({ testimonials })
        // Construct JavaScript to display the testimonials
        //     const testimonialsJs = `
        //   const testimonials = ${JSON.stringify(testimonials)};
        //   const container = document.createElement("div");
        //   container.className = "testimonial-container";

        //   testimonials.forEach(testimonial => {
        //     const testimonialElement = document.createElement("div");
        //     testimonialElement.className = "testimonial";

        //     const userName = document.createElement("h3");
        //     userName.textContent = testimonial.userName;
        //     testimonialElement.appendChild(userName);

        //     const userImage = document.createElement("img");
        //     userImage.src = testimonial.userImage;
        //     userImage.alt = testimonial.userName;
        //     testimonialElement.appendChild(userImage);

        //     const message = document.createElement("p");
        //     message.textContent = testimonial.message;
        //     testimonialElement.appendChild(message);

        //     const rating = document.createElement("p");
        //     rating.textContent = "Rating: " + testimonial.rating;
        //     testimonialElement.appendChild(rating);

        //     // Append the testimonial element to the container
        //     container.appendChild(testimonialElement);
        //   });

        //   document.body.appendChild(container);
        // `;

        const testimonialsJs = `
  // Add styles dynamically
  const style = document.createElement('style');
  style.innerHTML = \`
    .testimonial-container {
        display: flex;
        overflow: hidden;
        white-space: nowrap;
        animation: scrollTestimonials 20s linear infinite;
        width: 100%;
        margin: 20px 0;
    }
    .testimonial {
        flex: 0 0 auto;
        width: 300px;
        margin-right: 20px;
        padding: 20px;
        background: #f4f4f4;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease-in-out;
    }
    .testimonial:hover {
        transform: scale(1.05);
    }
    .testimonial img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin-bottom: 15px;
        object-fit: cover;
    }
    .testimonial h3 {
        font-size: 1.2em;
        margin-bottom: 5px;
        color: #333;
    }
    .testimonial p {
        font-size: 1em;
        color: #666;
        margin-bottom: 10px;
    }
    .testimonial p:last-child {
        font-size: 0.9em;
        color: #999;
        font-style: italic;
    }
    @keyframes scrollTestimonials {
        0% {
            transform: translateX(100%);
        }
        100% {
            transform: translateX(-100%);
        }
    }
  \`;
  document.head.appendChild(style);

  // Create testimonials container and populate it with data
  const testimonials = ${JSON.stringify(testimonials)};
  const container = document.createElement("div");
  container.className = "testimonial-container";

  testimonials.forEach(testimonial => {
    const testimonialElement = document.createElement("div");
    testimonialElement.className = "testimonial";

    const userName = document.createElement("h3");
    userName.textContent = testimonial.userName;
    testimonialElement.appendChild(userName);

    const userImage = document.createElement("img");
    userImage.src = testimonial.imageUrl;
    userImage.alt = testimonial.userName;
    testimonialElement.appendChild(userImage);

    const message = document.createElement("p");
    message.textContent = testimonial.message;
    testimonialElement.appendChild(message);

    const rating = document.createElement("p");
    rating.textContent = "Rating: " + testimonial.rating;
    testimonialElement.appendChild(rating);

    container.appendChild(testimonialElement);
  });

  document.body.appendChild(container);
`;

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const testimonialsJs2 = `
  // Add styles dynamically
  const style = document.createElement('style');
  style.innerHTML = \`
    .testimonial-container {
        display: flex;
        flex-direction: column;
        height: 300px; /* Fixed height for the parent container */
        overflow: hidden;
        position: relative;
        animation: scrollTestimonials 10s linear infinite;
        margin: 20px 0;
    }
    .testimonial-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }
    .testimonial {
        flex: 0 0 48%; /* Two items in one row */
        padding: 20px;
        background: #f4f4f4;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease-in-out;
    }
    .testimonial:hover {
        transform: scale(1.05);
    }
    .testimonial img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin-bottom: 15px;
        object-fit: cover;
    }
    .testimonial h3 {
        font-size: 1.2em;
        margin-bottom: 5px;
        color: #333;
    }
    .testimonial p {
        font-size: 1em;
        color: #666;
        margin-bottom: 10px;
    }
    .testimonial p:last-child {
        font-size: 0.9em;
        color: #999;
        font-style: italic;
    }
    @keyframes scrollTestimonials {
        0% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(-100%);
        }
    }
  \`;
  document.head.appendChild(style);

  // Create testimonials container and populate it with data
  const testimonials = ${JSON.stringify(testimonials)};
  const container = document.createElement("div");
  container.className = "testimonial-container";

  // Group testimonials in rows of two
  for (let i = 0; i < testimonials.length; i += 2) {
    const row = document.createElement("div");
    row.className = "testimonial-row";

    // Add two testimonials per row
    for (let j = i; j < i + 2 && j < testimonials.length; j++) {
      const testimonial = testimonials[j];
      const testimonialElement = document.createElement("div");
      testimonialElement.className = "testimonial";

      const userName = document.createElement("h3");
      userName.textContent = testimonial.userName;
      testimonialElement.appendChild(userName);

      const userImage = document.createElement("img");
      userImage.src = testimonial.imageUrl;
      userImage.alt = testimonial.userName;
      testimonialElement.appendChild(userImage);

      const message = document.createElement("p");
      message.textContent = testimonial.message;
      testimonialElement.appendChild(message);

      const rating = document.createElement("p");
      rating.textContent = "Rating: " + testimonial.rating;
      testimonialElement.appendChild(rating);

      row.appendChild(testimonialElement);
    }

    container.appendChild(row);
  }

  document.body.appendChild(container);
`;

        // Return JavaScript with Content-Type set to application/javascript
        return new Response(testimonialsJs, {
            status: 200,
            headers: {
                "Content-Type": "application/javascript", // Ensure it's JavaScript
            },
        });
    } catch (error) {
        console.error("Error fetching testimonials:", error);
        return new Response('console.error("Error fetching testimonials");', {
            status: 500,
            headers: {
                "Content-Type": "application/javascript", // Return JavaScript on error
            },
        });
    }
}
