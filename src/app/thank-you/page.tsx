"use client"
import React, { useEffect } from "react";

const ThankYou = () => {
    useEffect(() => {
        // Dynamically load the Tenor embed script
        const script = document.createElement("script");
        script.src = "https://tenor.com/embed.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            {/* Tenor GIF Section */}

            <div className="min-h-72 min-w-72 flex flex-col justify-center items-center">
                <div
                    className="tenor-gif-embed rounded "
                    data-postid="20996652"
                    data-share-method="host"
                    data-aspect-ratio="1.25"
                    data-width="100%"
                    style={{ width: "100%" }}
                >
                    <a href="https://tenor.com/view/mahendra-singh-dhoni-ms-dhoni-captain-cool-bat-twirl-cricket-world-cup2011-gif-20996652">

                    </a>
                    from{" "}
                    <a href="https://tenor.com/search/mahendra+singh+dhoni-gifs">

                    </a>
                </div>

                {/* Thank You Message */}
                <h1 className="text-3xl font-bold mt-8">Thank You!</h1>
                <h2 className="flex m-auto px-4 items-center justify-center self-center">Thank you so much for your feedback! It means a lot to us 😊</h2>
                <h1>🙏 🌟</h1>
            </div>
        </div>
    );
};

export default ThankYou;
