import Testimonial from "@/app/models/testimonial.model";
import connectToDb from "../../../lib/connetToDb";

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
        const testimonials = await Testimonial.find({ spaceId: spaceId, isLiked: true });



        //     const testimonialsJs = `
        //     // Add Font Awesome stylesheet dynamically
        //     const fontAwesomeLink = document.createElement('link');
        //     fontAwesomeLink.rel = 'stylesheet';
        //     fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
        //     document.head.appendChild(fontAwesomeLink);

        //     // Add custom styles dynamically
        //     const style = document.createElement('style');
        //     style.innerHTML = \`
        //       .testimonial-container {
        //           display: flex;

        //           white-space: nowrap;
        //           animation: scrollTestimonials 20s linear infinite;
        //           width: 100%;
        //           margin: 20px 0;
        //       }
        //       .testimonial {
        //           flex: 0 0 auto;
        //           width: 300px;
        //           margin-right: 20px;
        //           padding: 20px;

        //           border-radius: 8px;
        //           box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        //           transition: transform 0.3s ease-in-out;
        //       }
        //       .testimonial:hover {
        //           transform: scale(1.05);
        //       }
        //           .testimonialHeader {
        //             display:flex;
        //             flex-direction:row;
        //             gap:3px;
        //           }
        //       .testimonial img {
        //           width: 60px;
        //           height: 60px;
        //           border-radius: 50%;
        //           margin-bottom: 15px;
        //           object-fit: cover;
        //       }
        //       .testimonial h3 {
        //           font-size: 1.2em;
        //           margin-bottom: 5px;
        //           color: #333;
        //       }
        //       .testimonial p {
        //           font-size: 1em;
        //           color: #666;
        //           margin-bottom: 10px;
        //       }
        //       .individualStar {
        //         margin-right: 10px;
        //         font-size: 2rem;
        //       }
        //       .stars {
        //           color: #FFD700;
        //           margin-bottom: 10px;
        //           margin-right: 5px;
        //           padding:3px;
        //       }
        //       @keyframes scrollTestimonials {
        //           0% {
        //               transform: translateX(100%);
        //           }
        //           100% {
        //               transform: translateX(-100%);
        //           }
        //       }
        //     \`; 
        //     document.head.appendChild(style);

        //     // Create testimonials container and populate it with data
        //     const testimonials = ${JSON.stringify(testimonials)};
        //     const container = document.createElement("div");
        //     container.className = "testimonial-container";

        //     function capitalizeName(name) {
        //   return name
        //     .split(' ')
        //     .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        //     .join(' ');
        // }

        //     testimonials.forEach(testimonial => {
        //       const testimonialElement = document.createElement("div");
        //       testimonialElement.className = "testimonial";
        //       const testimonialHeaderElement = document.createElement("div");
        //       testimonialHeaderElement.className = "testimonialHeader";

        //       const userImage = document.createElement("img");
        //       userImage.src = testimonial.imageUrl;
        //       userImage.alt = capitalizeName(testimonial.userName);
        //       const userName = document.createElement("h3");
        //       userName.textContent = testimonial.userName;

        //       testimonialHeaderElement.appendChild(userImage);
        //       testimonialHeaderElement.appendChild(userName);

        //       container.appendChild(testimonialHeaderElement)



        //       // Add star rating
        //       const stars = document.createElement("div");
        //       stars.className = "stars";
        //       for (let i = 0; i < 5; i++) {
        //         const star = document.createElement("i");
        //         star.className = i < testimonial.rating ? "fa fa-star individualStar" : "fa fa-star-o individualStar";
        //         stars.appendChild(star);
        //       }
        //       testimonialElement.appendChild(stars);

        //       const message = document.createElement("p");
        //       message.textContent = testimonial.message;
        //       testimonialElement.appendChild(message);

        //       container.appendChild(testimonialElement);
        //     });

        //     document.body.appendChild(container);
        //   `;

        //     const testi4 = `
        //     // Add Font Awesome stylesheet dynamically
        // const fontAwesomeLink = document.createElement('link');
        // fontAwesomeLink.rel = 'stylesheet';
        // fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
        // document.head.appendChild(fontAwesomeLink);

        // // Add custom styles dynamically
        // const style = document.createElement('style');
        // style.innerHTML = \`
        //   .testimonial-container {
        //       display: flex;
        //       flex-direction: row;
        //       align-items: center;
        //       margin: 20px 0;
        //       width: 100%;
        //   }
        //   .testimonial {
        //       width: 400px;
        //       padding: 20px;
        //       border: 1px solid #ddd;
        //       border-radius: 8px;
        //       box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        //       transition: transform 0.3s ease-in-out;
        //       background: #fff;
        //       margin-bottom: 20px;
        //   }
        //   .testimonial:hover {
        //       transform: scale(1.05);
        //   }
        //   .testimonialHeader {
        //       display: flex;
        //       align-items: center;
        //       margin-bottom: 15px;
        //   }
        //   .testimonial img {
        //       width: 50px;
        //       height: 50px;
        //       border-radius: 50%;
        //       object-fit: cover;
        //       margin-right: 15px;
        //   }
        //   .testimonial h3 {
        //       font-size: 1.1em;
        //       color: #333;
        //       margin: 0;
        //   }
        //   .stars {
        //       display: flex;
        //       align-items: center;
        //       margin-bottom: 10px;
        //   }
        //   .stars i {
        //       font-size: 1.2rem;
        //       color: #FFD700;
        //       margin-right: 3px;
        //   }
        //   .stars i.fa-star-o {
        //       color: #ccc;
        //   }
        //   .testimonial p {
        //       font-size: 1em;
        //       color: #555;
        //       margin-bottom: 15px;
        //   }
        //   .testimonial .date {
        //       font-size: 0.85em;
        //       color: #888;
        //       margin-top: 10px;
        //   }
        //   .user-initials {
        //     width: 50px;
        //     height: 50px;
        //     display: flex;
        //     align-items: center;
        //     justify-content: center;
        //     border-radius: 50%;
        //     background-color: rgb(147 51 234);
        //     color: white;
        //     font-weight: bold;
        //     font-size: 1.2em;
        //     margin-right: 15px;
        // }
        //     .testimonial-image {
        //       height:100px;
        //       widht: 100px;
        //       display: flex;
        //       justify-content:center;
        //       align-items: center;
        //       margin:auto;
        //     }

        //  \`; 
        // document.head.appendChild(style);

        // // Testimonial Data
        //  const testimonials = ${JSON.stringify(testimonials)};

        // // Create testimonials container and populate it with data
        // const container = document.createElement("div");
        // container.className = "testimonial-container";

        // function capitalizeName(name) {
        //     return name
        //         .split(" ")
        //         .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        //         .join(" ");
        // }

        // testimonials.forEach((testimonial) => {
        //     const testimonialElement = document.createElement("div");
        //     testimonialElement.className = "testimonial";

        //    const testimonialHeaderElement = document.createElement("div");
        // testimonialHeaderElement.className = "testimonialHeader";

        // if (testimonial.userImage) {
        //     // If userImage is available, display the image
        //     const userImage = document.createElement("img");
        //     userImage.src = testimonial.userImage;
        //     userImage.alt = capitalizeName(testimonial.userName);
        //     testimonialHeaderElement.appendChild(userImage);
        // } else {
        //     // If userImage is not available, display initials with a blue background
        //     const userInitials = document.createElement("div");
        //     userInitials.className = "user-initials";
        //     userInitials.textContent = testimonial.userName
        //         .split(" ")
        //         .map((word) => word.charAt(0).toUpperCase())
        //         .join(""); // Extract initials
        //     testimonialHeaderElement.appendChild(userInitials);
        // }

        // // Add the user name
        // const userName = document.createElement("h3");
        // userName.textContent = capitalizeName(testimonial.userName);
        // testimonialHeaderElement.appendChild(userName);

        // testimonialElement.appendChild(testimonialHeaderElement);


        //     // Add star rating
        //     const stars = document.createElement("div");
        //     stars.className = "stars";
        //     for (let i = 0; i < 5; i++) {
        //         const star = document.createElement("i");
        //         star.className = i < testimonial.rating ? "fa fa-star" : "fa fa-star-o";
        //         stars.appendChild(star);
        //     }
        //     testimonialElement.appendChild(stars);

        //     if(testimonial.imageUrl) {
        //     const imageDiv = document.createElement("div");
        //     imageDiv.className = "testimonial-image";
        //        const testimonialImage = document.createElement("img");
        //     testimonialImage.src = testimonial.imageUrl;
        //     testimonialImage.alt = "";
        //     imageDiv.appendChild(testimonialImage);
        //     testimonialElement.appendChild(imageDiv);

        //     }
        //     // Add message
        //     const message = document.createElement("p");
        //     message.textContent = testimonial.message;
        //     testimonialElement.appendChild(message);

        //     // Add date
        //     const date = document.createElement("div");
        //     date.className = "date";
        //     date.textContent = testimonial.date;
        //     testimonialElement.appendChild(date);

        //     container.appendChild(testimonialElement);
        // });

        // document.body.appendChild(container);

        //   `

        //     const testi5 = `
        // // Add Font Awesome stylesheet dynamically
        // const fontAwesomeLink = document.createElement('link');
        // fontAwesomeLink.rel = 'stylesheet';
        // fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
        // document.head.appendChild(fontAwesomeLink);

        // // Add custom styles dynamically
        // const style = document.createElement('style');
        // style.innerHTML = \`
        //   .testimonial-container {
        //       display: flex;
        //       flex-direction: row;
        //       align-items: flex-start;
        //       overflow-x: auto;
        //       scroll-behavior: smooth;
        //       width: 100%;
        //       padding: 10px;
        //       gap: 20px;
        //       justify-content: flex-end;
        //   }
        //   .testimonial-container::-webkit-scrollbar {
        //       height: 8px;
        //   }
        //   .testimonial-container::-webkit-scrollbar-thumb {
        //       background: #888;
        //       border-radius: 4px;
        //   }
        //   .testimonial-container::-webkit-scrollbar-track {
        //       background: #f1f1f1;
        //   }
        //   .testimonial {
        //       min-width: 350px;
        //       max-width: 400px;
        //       flex: 0 0 auto;
        //       padding: 20px;
        //       border: 1px solid #ddd;
        //       border-radius: 8px;
        //       box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        //       transition: transform 0.3s ease-in-out;
        //       background: #fff;
        //   }
        //   .testimonial:hover {
        //       transform: scale(1.05);
        //   }
        //   .testimonialHeader {
        //       display: flex;
        //       align-items: center;
        //       margin-bottom: 15px;
        //   }
        //   .testimonial img {
        //       width: 50px;
        //       height: 50px;
        //       border-radius: 50%;
        //       object-fit: cover;
        //       margin-right: 15px;
        //   }
        //   .testimonial h3 {
        //       font-size: 1.1em;
        //       color: #333;
        //       margin: 0;
        //   }
        //   .stars {
        //       display: flex;
        //       align-items: center;
        //       margin-bottom: 10px;
        //   }
        //   .stars i {
        //       font-size: 1.2rem;
        //       color: #FFD700;
        //       margin-right: 3px;
        //   }
        //   .stars i.fa-star-o {
        //       color: #ccc;
        //   }
        //   .testimonial p {
        //       font-size: 1em;
        //       color: #555;
        //       margin-bottom: 15px;
        //   }
        //   .testimonial .date {
        //       font-size: 0.85em;
        //       color: #888;
        //       margin-top: 10px;
        //   }
        //   .user-initials {
        //       width: 50px;
        //       height: 50px;
        //       display: flex;
        //       align-items: center;
        //       justify-content: center;
        //       border-radius: 50%;
        //       background-color: rgb(147 51 234);
        //       color: white;
        //       font-weight: bold;
        //       font-size: 1.2em;
        //       margin-right: 15px;
        //   }
        //   .testimonial-image {
        //       height: 100px;
        //       width: 100px;
        //       display: flex;
        //       justify-content: center;
        //       align-items: center;
        //       margin: auto;
        //   }
        // \`;
        // document.head.appendChild(style);

        // // Testimonial Data
        // const testimonials = ${JSON.stringify(testimonials)};

        // // Create testimonials container and populate it with data
        // const container = document.createElement("div");
        // container.className = "testimonial-container";

        // function capitalizeName(name) {
        //     return name
        //         .split(" ")
        //         .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        //         .join(" ");
        // }

        // testimonials.forEach((testimonial) => {
        //     const testimonialElement = document.createElement("div");
        //     testimonialElement.className = "testimonial";

        //     const testimonialHeaderElement = document.createElement("div");
        //     testimonialHeaderElement.className = "testimonialHeader";

        //     if (testimonial.userImage) {
        //         // If userImage is available, display the image
        //         const userImage = document.createElement("img");
        //         userImage.src = testimonial.userImage;
        //         userImage.alt = capitalizeName(testimonial.userName);
        //         testimonialHeaderElement.appendChild(userImage);
        //     } else {
        //         // If userImage is not available, display initials with a blue background
        //         const userInitials = document.createElement("div");
        //         userInitials.className = "user-initials";
        //         userInitials.textContent = testimonial.userName
        //             .split(" ")
        //             .map((word) => word.charAt(0).toUpperCase())
        //             .join(""); // Extract initials
        //         testimonialHeaderElement.appendChild(userInitials);
        //     }

        //     // Add the user name
        //     const userName = document.createElement("h3");
        //     userName.textContent = capitalizeName(testimonial.userName);
        //     testimonialHeaderElement.appendChild(userName);

        //     testimonialElement.appendChild(testimonialHeaderElement);

        //     // Add star rating
        //     const stars = document.createElement("div");
        //     stars.className = "stars";
        //     for (let i = 0; i < 5; i++) {
        //         const star = document.createElement("i");
        //         star.className = i < testimonial.rating ? "fa fa-star" : "fa fa-star-o";
        //         stars.appendChild(star);
        //     }
        //     testimonialElement.appendChild(stars);

        //     if (testimonial.imageUrl) {
        //         const imageDiv = document.createElement("div");
        //         imageDiv.className = "testimonial-image";
        //         const testimonialImage = document.createElement("img");
        //         testimonialImage.src = testimonial.imageUrl;
        //         testimonialImage.alt = "";
        //         imageDiv.appendChild(testimonialImage);
        //         testimonialElement.appendChild(imageDiv);
        //     }

        //     // Add message
        //     const message = document.createElement("p");
        //     message.textContent = testimonial.message;
        //     testimonialElement.appendChild(message);

        //     // Add date
        //     const date = document.createElement("div");
        //     date.className = "date";
        //     date.textContent = testimonial.date;
        //     testimonialElement.appendChild(date);

        //     container.appendChild(testimonialElement);
        // });

        // document.body.appendChild(container);
        // `;

        //     const testi3 = `
        // // Add Font Awesome stylesheet dynamically
        // const fontAwesomeLink = document.createElement('link');
        // fontAwesomeLink.rel = 'stylesheet';
        // fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
        // document.head.appendChild(fontAwesomeLink);

        // // Add custom styles dynamically
        // const style = document.createElement('style');
        // style.innerHTML = \`
        //   .testimonial-container {
        //       display: flex;
        //       flex-direction: row;
        //       align-items: center;
        //       margin: 20px 0;
        //       width: 100%;
        //       overflow: hidden; /* Hide overflow for smooth scrolling */
        //       position: relative;
        //   }
        //   .testimonial-wrapper {
        //       display: flex;
        //       flex-direction: row;
        //       animation: scroll-left 20s linear infinite;
        //   }
        //   .testimonial {
        //       flex: 0 0 auto;
        //       width: 400px;
        //       padding: 20px;
        //       border: 1px solid #ddd;
        //       border-radius: 8px;
        //       box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        //       transition: transform 0.3s ease-in-out;
        //       background: #fff;
        //       margin: 0 20px;
        //   }
        //         .testimonial:hover {
        //         background: rgba(238, 238, 238, 0.8);
        //         }
        //   .testimonial:hover {
        //       transform: scale(1.05);
        //   }
        //   .testimonialHeader {
        //       display: flex;
        //       align-items: center;
        //       margin-bottom: 15px;
        //   }
        //   .testimonial img {
        //       width: 50px;
        //       height: 50px;
        //       border-radius: 50%;
        //       object-fit: cover;
        //       margin-right: 15px;
        //   }
        //   .testimonial h3 {
        //       font-size: 1.1em;
        //       color: #333;
        //       margin: 0;
        //   }
        //   .stars {
        //       display: flex;
        //       align-items: center;
        //       margin-bottom: 10px;
        //   }
        //   .stars i {
        //       font-size: 1.2rem;
        //       color: #FFD700;
        //       margin-right: 3px;
        //   }
        //   .stars i.fa-star-o {
        //       color: #ccc;
        //   }
        //   .testimonial p {
        //       font-size: 1em;
        //       color: #555;
        //       margin-bottom: 15px;
        //   }
        //   .testimonial .date {
        //       font-size: 0.85em;
        //       color: #888;
        //       margin-top: 10px;
        //   }
        //   .user-initials {
        //       width: 50px;
        //       height: 50px;
        //       display: flex;
        //       align-items: center;
        //       justify-content: center;
        //       border-radius: 50%;
        //       background-color: rgb(147 51 234);
        //       color: white;
        //       font-weight: bold;
        //       font-size: 1.2em;
        //       margin-right: 15px;
        //   }
        //   .testimonial-image {
        //       height: 100px;
        //       width: 100px;
        //       display: flex;
        //       justify-content: center;
        //       align-items: center;
        //       margin: auto;
        //   }

        //   /* Add scrolling animation */
        //   @keyframes scroll-left {
        //       0% {
        //           transform: translateX(0);
        //       }
        //       100% {
        //           transform: translateX(-100%);
        //       }
        //   }
        // \`;
        // document.head.appendChild(style);

        // // Testimonial Data
        // const testimonials = ${JSON.stringify(testimonials)};

        // // Create testimonials container and populate it with data
        // const container = document.createElement("div");
        // container.className = "testimonial-container";

        // const wrapper = document.createElement("div");
        // wrapper.className = "testimonial-wrapper";

        // function capitalizeName(name) {
        //     return name
        //         .split(" ")
        //         .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        //         .join(" ");
        // }

        // testimonials.forEach((testimonial) => {
        //     const testimonialElement = document.createElement("div");
        //     testimonialElement.className = "testimonial";

        //     const testimonialHeaderElement = document.createElement("div");
        //     testimonialHeaderElement.className = "testimonialHeader";

        //     if (testimonial.userImage) {
        //         // If userImage is available, display the image
        //         const userImage = document.createElement("img");
        //         userImage.src = testimonial.userImage;
        //         userImage.alt = capitalizeName(testimonial.userName);
        //         testimonialHeaderElement.appendChild(userImage);
        //     } else {
        //         // If userImage is not available, display initials with a blue background
        //         const userInitials = document.createElement("div");
        //         userInitials.className = "user-initials";
        //         userInitials.textContent = testimonial.userName
        //             .split(" ")
        //             .map((word) => word.charAt(0).toUpperCase())
        //             .join(""); // Extract initials
        //         testimonialHeaderElement.appendChild(userInitials);
        //     }

        //     // Add the user name
        //     const userName = document.createElement("h3");
        //     userName.textContent = capitalizeName(testimonial.userName);
        //     testimonialHeaderElement.appendChild(userName);

        //     testimonialElement.appendChild(testimonialHeaderElement);

        //     // Add star rating
        //     const stars = document.createElement("div");
        //     stars.className = "stars";
        //     for (let i = 0; i < 5; i++) {
        //         const star = document.createElement("i");
        //         star.className = i < testimonial.rating ? "fa fa-star" : "fa fa-star-o";
        //         stars.appendChild(star);
        //     }
        //     testimonialElement.appendChild(stars);

        //     if (testimonial.imageUrl) {
        //         const imageDiv = document.createElement("div");
        //         imageDiv.className = "testimonial-image";
        //         const testimonialImage = document.createElement("img");
        //         testimonialImage.src = testimonial.imageUrl;
        //         testimonialImage.alt = "";
        //         imageDiv.appendChild(testimonialImage);
        //         testimonialElement.appendChild(imageDiv);
        //     }

        //     // Add message
        //     const message = document.createElement("p");
        //     message.textContent = testimonial.message;
        //     testimonialElement.appendChild(message);

        //     // Add date
        //     const date = document.createElement("div");
        //     date.className = "date";
        //     date.textContent = testimonial.date;
        //     testimonialElement.appendChild(date);

        //     wrapper.appendChild(testimonialElement);
        // });

        // container.appendChild(wrapper);
        // document.body.appendChild(container);
        // `;

        const testi3 = `
    // Add Font Awesome stylesheet dynamically
    const fontAwesomeLink = document.createElement('link');
    fontAwesomeLink.rel = 'stylesheet';
    fontAwesomeLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
    document.head.appendChild(fontAwesomeLink);

    // Add custom styles dynamically
    const style = document.createElement('style');
    style.innerHTML = \`
        .testimonial-container {
            display: flex;
            flex-direction: row;
            align-items: center;
            margin: 20px 0;
            width: 100%;
            overflow: hidden;
            position: relative;
        }
        .testimonial-wrapper {
            display: flex;
            flex-direction: row;
            animation: scroll-left 20s linear infinite;
        }
        .testimonial {
            flex: 0 0 auto;
            width: 400px;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease-in-out;
            background: #fff;
            margin: 0 20px;
        }
        .testimonial:hover {
            transform: scale(1.05);
            background: rgba(238, 238, 238, 0.8);
        }
        .testimonialHeader {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
        }
        .testimonial img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            object-fit: cover;
            margin-right: 15px;
        }
        .testimonial h3 {
            font-size: 1.1em;
            color: #333;
            margin: 0;
        }
        .stars {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
        }
        .stars i {
            font-size: 1.2rem;
            color: #FFD700;
            margin-right: 3px;
        }
        .stars i.fa-star-o {
            color: #ccc;
        }
        .testimonial p {
            font-size: 1em;
            color: #555;
            margin-bottom: 15px;
        }
        .testimonial .date {
            font-size: 0.85em;
            color: #888;
            margin-top: 10px;
        }
        .user-initials {
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background-color: rgb(147, 51, 234);
            color: white;
            font-weight: bold;
            font-size: 1.2em;
            margin-right: 15px;
        }
        .testimonial-image {
            width: 100%;
            height: auto;
            margin-top: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .testimonial-image img {
            width: 50%;
            height: 50%;
            max-height: 400px;
            object-fit: contain;
        }

        /* Add scrolling animation */
        @keyframes scroll-left {
            0% {
                transform: translateX(0);
            }
            100% {
                transform: translateX(-100%);
            }
        }
    \`;
    document.head.appendChild(style);

    // Testimonial Data
    const testimonials = ${JSON.stringify(testimonials)};

    // Create testimonials container and populate it with data
    const container = document.createElement("div");
    container.className = "testimonial-container";

    const wrapper = document.createElement("div");
    wrapper.className = "testimonial-wrapper";

    function capitalizeName(name) {
        return name
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
    }

    testimonials.forEach((testimonial) => {
        const testimonialElement = document.createElement("div");
        testimonialElement.className = "testimonial";

        const testimonialHeaderElement = document.createElement("div");
        testimonialHeaderElement.className = "testimonialHeader";

        if (testimonial.userImage) {
            const userImage = document.createElement("img");
            userImage.src = testimonial.userImage;
            userImage.alt = capitalizeName(testimonial.userName);
            testimonialHeaderElement.appendChild(userImage);
        } else {
            const userInitials = document.createElement("div");
            userInitials.className = "user-initials";
            userInitials.textContent = testimonial.userName
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase())
                .join("");
            testimonialHeaderElement.appendChild(userInitials);
        }

        const userName = document.createElement("h3");
        userName.textContent = capitalizeName(testimonial.userName);
        testimonialHeaderElement.appendChild(userName);

        testimonialElement.appendChild(testimonialHeaderElement);

        const stars = document.createElement("div");
        stars.className = "stars";
        for (let i = 0; i < 5; i++) {
            const star = document.createElement("i");
            star.className = i < testimonial.rating ? "fa fa-star" : "fa fa-star-o";
            stars.appendChild(star);
        }
        testimonialElement.appendChild(stars);

        if (testimonial.imageUrl) {
            const imageDiv = document.createElement("div");
            imageDiv.className = "testimonial-image";
            const testimonialImage = document.createElement("img");
            testimonialImage.src = testimonial.imageUrl;
            testimonialImage.alt = "Testimonial Image";
            imageDiv.appendChild(testimonialImage);
            testimonialElement.appendChild(imageDiv);
        }

        const message = document.createElement("p");
        message.textContent = testimonial.message;
        testimonialElement.appendChild(message);

        const date = document.createElement("div");
        date.className = "date";
        date.textContent = testimonial.date;
        testimonialElement.appendChild(date);

        wrapper.appendChild(testimonialElement);
    });

    container.appendChild(wrapper);
    document.body.appendChild(container);
`;




        //     const testi9 = `
        // // Add Font Awesome stylesheet dynamically
        // const fontAwesomeLink = document.createElement("link");
        // fontAwesomeLink.rel = "stylesheet";
        // fontAwesomeLink.href =
        //   "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
        // document.head.appendChild(fontAwesomeLink);

        // // Add custom styles dynamically
        // const style = document.createElement("style");
        // style.innerHTML = \`
        //   .testimonial-container {
        //       position: relative;
        //       width: 100%;
        //       overflow: hidden;
        //   }
        //   .testimonial-wrapper {
        //       display: flex;
        //       transition: transform 0.5s ease-in-out;
        //   }
        //   .testimonial {
        //       flex: 0 0 auto;
        //       width: calc(33.33% - 20px); /* Adjust to show 3 at a time */
        //       margin: 10px;
        //       border: 1px solid #ddd;
        //       border-radius: 8px;
        //       background: #fff;
        //       box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        //       padding: 20px;
        //       text-align: center;
        //   }
        //   .testimonial h3 {
        //       font-size: 1.2em;
        //       color: #333;
        //   }
        //   .stars i {
        //       font-size: 1.2rem;
        //       color: #FFD700;
        //   }
        //   .arrow-button {
        //       position: absolute;
        //       top: 50%;
        //       transform: translateY(-50%);
        //       background: rgba(0, 0, 0, 0.5);
        //       color: #fff;
        //       border: none;
        //       border-radius: 50%;
        //       width: 40px;
        //       height: 40px;
        //       display: flex;
        //       align-items: center;
        //       justify-content: center;
        //       cursor: pointer;
        //   }
        //   .arrow-button.left {
        //       left: 10px;
        //   }
        //   .arrow-button.right {
        //       right: 10px;
        //   }
        //   @media (max-width: 768px) {
        //       .testimonial {
        //           width: calc(50% - 20px); /* Adjust to show 2 at a time */
        //       }
        //   }
        //   @media (max-width: 480px) {
        //       .testimonial {
        //           width: calc(100% - 20px); /* Adjust to show 1 at a time */
        //       }
        //   }
        // \`;
        // document.head.appendChild(style);

        // const testimonials = ${JSON.stringify(testimonials)};

        // // Create testimonials container and navigation buttons
        // const container = document.createElement("div");
        // container.className = "testimonial-container";

        // const wrapper = document.createElement("div");
        // wrapper.className = "testimonial-wrapper";

        // testimonials.forEach((testimonial) => {
        //   const testimonialElement = document.createElement("div");
        //   testimonialElement.className = "testimonial";

        //   const userName = document.createElement("h3");
        //   userName.textContent = testimonial.userName;
        //   testimonialElement.appendChild(userName);

        //   const stars = document.createElement("div");
        //   stars.className = "stars";
        //   for (let i = 0; i < 5; i++) {
        //     const star = document.createElement("i");
        //     star.className = i < testimonial.rating ? "fa fa-star" : "fa fa-star-o";
        //     stars.appendChild(star);
        //   }
        //   testimonialElement.appendChild(stars);

        //   const message = document.createElement("p");
        //   message.textContent = testimonial.message;
        //   testimonialElement.appendChild(message);

        //   const date = document.createElement("div");
        //   date.textContent = testimonial.date;
        //   testimonialElement.appendChild(date);

        //   wrapper.appendChild(testimonialElement);
        // });

        // const leftButton = document.createElement("button");
        // leftButton.className = "arrow-button left";
        // leftButton.innerHTML = "<i class='fa fa-chevron-left'></i>";
        // container.appendChild(leftButton);

        // const rightButton = document.createElement("button");
        // rightButton.className = "arrow-button right";
        // rightButton.innerHTML = "<i class='fa fa-chevron-right'></i>";
        // container.appendChild(rightButton);

        // container.appendChild(wrapper);
        // document.body.appendChild(container);

        // // Navigation logic
        // let currentIndex = 0;

        // function updateVisibleTestimonials() {
        //   const visibleCount = Math.floor(container.offsetWidth / wrapper.firstChild.offsetWidth);
        //   wrapper.style.transform = "translateX:(-
        //     currentIndex * (100 / visibleCount)
        //   }%)";
        // }

        // leftButton.addEventListener("click", () => {
        //   const visibleCount = Math.floor(container.offsetWidth / wrapper.firstChild.offsetWidth);
        //   currentIndex = Math.max(0, currentIndex - visibleCount);
        //   updateVisibleTestimonials();
        // });

        // rightButton.addEventListener("click", () => {
        //   const visibleCount = Math.floor(container.offsetWidth / wrapper.firstChild.offsetWidth);
        //   currentIndex = Math.min(
        //     testimonials.length - visibleCount,
        //     currentIndex + visibleCount
        //   );
        //   updateVisibleTestimonials();
        // });

        // window.addEventListener("resize", updateVisibleTestimonials);
        // updateVisibleTestimonials();

        //     `

        //     const testi10 = `
        //     // Add Font Awesome stylesheet dynamically
        //     const fontAwesomeLink = document.createElement("link");
        //     fontAwesomeLink.rel = "stylesheet";
        //     fontAwesomeLink.href =
        //       "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
        //     document.head.appendChild(fontAwesomeLink);

        //     // Add custom styles dynamically
        //     const style = document.createElement("style");
        //     style.innerHTML = \`
        //       .testimonial-container {
        //           position: relative;
        //           width: 100%;
        //           overflow: hidden;
        //       }
        //       .testimonial-wrapper {
        //           display: flex;
        //           transition: transform 0.5s ease-in-out;
        //       }
        //       .testimonial {
        //           flex: 0 0 auto;
        //           width: calc(33.33% - 20px); /* Adjust to show 3 at a time */
        //           margin: 10px;
        //           border: 1px solid #ddd;
        //           border-radius: 8px;
        //           background: #fff;
        //           box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        //           padding: 20px;
        //           text-align: center;
        //       }
        //       .testimonial h3 {
        //           font-size: 1.2em;
        //           color: #333;
        //       }
        //       .stars i {
        //           font-size: 1.2rem;
        //           color: #FFD700;
        //       }
        //       .arrow-button {
        //           position: absolute;
        //           top: 50%;
        //           transform: translateY(-50%);
        //           background: rgba(0, 0, 0, 0.5);
        //           color: #fff;
        //           border: none;
        //           border-radius: 50%;
        //           width: 40px;
        //           height: 40px;
        //           display: flex;
        //           align-items: center;
        //           justify-content: center;
        //           cursor: pointer;
        //       }
        //       .arrow-button.left {
        //           left: 10px;
        //       }
        //       .arrow-button.right {
        //           right: 10px;
        //       }
        //       @media (max-width: 768px) {
        //           .testimonial {
        //               width: calc(50% - 20px); /* Adjust to show 2 at a time */
        //           }
        //       }
        //       @media (max-width: 480px) {
        //           .testimonial {
        //               width: calc(100% - 20px); /* Adjust to show 1 at a time */
        //           }
        //       }
        //     \`;
        //     document.head.appendChild(style);

        //     const testimonials = ${JSON.stringify(testimonials)};

        //     // Create testimonials container and navigation buttons
        //     const container = document.createElement("div");
        //     container.className = "testimonial-container";

        //     const wrapper = document.createElement("div");
        //     wrapper.className = "testimonial-wrapper";

        //     testimonials.forEach((testimonial) => {
        //       const testimonialElement = document.createElement("div");
        //       testimonialElement.className = "testimonial";

        //       const userName = document.createElement("h3");
        //       userName.textContent = testimonial.userName;
        //       testimonialElement.appendChild(userName);

        //       const stars = document.createElement("div");
        //       stars.className = "stars";
        //       for (let i = 0; i < 5; i++) {
        //         const star = document.createElement("i");
        //         star.className = i < testimonial.rating ? "fa fa-star" : "fa fa-star-o";
        //         stars.appendChild(star);
        //       }
        //       testimonialElement.appendChild(stars);

        //       const message = document.createElement("p");
        //       message.textContent = testimonial.message;
        //       testimonialElement.appendChild(message);

        //       const date = document.createElement("div");
        //       date.textContent = testimonial.date;
        //       testimonialElement.appendChild(date);

        //       wrapper.appendChild(testimonialElement);
        //     });

        //     const leftButton = document.createElement("button");
        //     leftButton.className = "arrow-button left";
        //     leftButton.innerHTML = "<i class='fa fa-chevron-left'></i>";
        //     container.appendChild(leftButton);

        //     const rightButton = document.createElement("button");
        //     rightButton.className = "arrow-button right";
        //     rightButton.innerHTML = "<i class='fa fa-chevron-right'></i>";
        //     container.appendChild(rightButton);

        //     container.appendChild(wrapper);
        //     document.body.appendChild(container);

        //     // Navigation logic
        //     let currentIndex = 0;

        //     function updateVisibleTestimonials() {
        //       const visibleCount = Math.floor(
        //         container.offsetWidth / wrapper.firstElementChild!.clientWidth
        //       );
        //       const offset = currentIndex * wrapper.firstElementChild!.clientWidth;
        //       wrapper.style.transform = \`translateX("50px")\`; // Corrected syntax
        //     }

        //     function moveLeft() {
        //       if (currentIndex > 0) {
        //         currentIndex -= 1;
        //         updateVisibleTestimonials();
        //       }
        //     }

        //     function moveRight() {
        //       const visibleCount = Math.floor(
        //         container.offsetWidth / wrapper.firstElementChild!.clientWidth
        //       );
        //       if (currentIndex < testimonials.length - visibleCount) {
        //         currentIndex += 1;
        //         updateVisibleTestimonials();
        //       }
        //     }

        //     leftButton.addEventListener("click", moveLeft);
        //     rightButton.addEventListener("click", moveRight);

        //     window.addEventListener("resize", updateVisibleTestimonials);

        //     // Initial call to ensure proper layout
        //     updateVisibleTestimonials();
        //   `;




        //     const testimonialsJs2 = `
        // // Add styles dynamically
        // const style = document.createElement('style');
        // style.innerHTML = \`
        //   .testimonial-card {
        //     border-radius: 10px;
        //     padding: 20px;
        //     background-color: #222;
        //     color: #fff;
        //     margin-bottom: 20px;
        //   }
        //   // ... other styles for the card components
        // \`;
        // document.head.appendChild(style);

        // // Create testimonials container and populate it with data
        // const testimonials = ${JSON.stringify(testimonials)};
        // const container = document.createElement("div");
        // container.className = "testimonial-container";

        // testimonials.forEach(testimonial => {
        //   const card = document.createElement("div");
        //   card.className = "testimonial-card";

        //   // Header
        //   const header = document.createElement("div");
        //   header.className = "testimonial-header";
        //   header.innerHTML = \`
        //     <span>Testimonial</span>

        //   \`;
        //   card.appendChild(header);

        //   // Rating and Message
        //   const ratingAndMessage = document.createElement("div");
        //   ratingAndMessage.className = "testimonial-rating-message";
        //   ratingAndMessage.innerHTML = \`
        //     <div class="rating">
        //       </div>
        //     <p>testimonial.message</p>
        //   \`;
        //   card.appendChild(ratingAndMessage);

        //   // Image (if available)
        //   if (testimonial.imageUrl) {
        //     const image = document.createElement("img");
        //     image.src = testimonial.imageUrl;
        //     image.alt = "Testimonial Image";
        //     image.class = "testimonial-image";
        //     card.appendChild(image);
        //   }

        //   // User Details
        //   const userDetails = document.createElement("div");
        //   userDetails.className = "testimonial-user-details";
        //   userDetails.innerHTML = \`
        //     <div class="user-avatar">
        //       <img src="testimonial.userImage" alt="User Avatar">
        //     </div>
        //     <div class="user-info">
        //       <h3>testimonial.userName</h3>
        //       <p>testimonial.userEmail</p>
        //     </div>
        //   \`;
        //   card.appendChild(userDetails);

        //   container.appendChild(card);
        // });

        // document.body.appendChild(container);
        // `;



        // Return JavaScript with Content-Type set to application/javascript
        return new Response(testi3, {
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
