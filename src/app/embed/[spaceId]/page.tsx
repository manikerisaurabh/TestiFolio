// import { GetServerSidePropsContext } from "next";
// import Testimonial from "@/app/models/testimonial.model";
// import connectToDb from "@/lib/connetToDb";

// interface Props {
//     spaceId: string;
//     testimonials: Array<{
//         message: string;
//         imageUrl?: string;
//         userName: string;
//         userImage?: string;
//     }>;
// }

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//     const { spaceId } = context.params as { spaceId: string };

//     await connectToDb();

//     try {
//         // Fetch testimonials for the given spaceId
//         const testimonials = await Testimonial.find({ spaceId });

//         return {
//             props: {
//                 spaceId,
//                 testimonials: JSON.parse(JSON.stringify(testimonials)),
//             },
//         };
//     } catch (error) {
//         console.error("Error fetching testimonials:", error);
//         return {
//             props: {
//                 spaceId,
//                 testimonials: [],
//             },
//         };
//     }
// }

// const EmbedPage = ({ spaceId, testimonials }: Props) => {
//     // This function generates the embed script
//     const generateEmbedScript = () => `
//         <script type="text/javascript">
//             (function() {
//                 const iframe = document.createElement('iframe');
//                 iframe.src = '/api/embed?spaceId=${spaceId}';
//                 iframe.width = '100%';
//                 iframe.height = '400';
//                 iframe.style.border = 'none';
//                 document.currentScript.parentNode.insertBefore(iframe, document.currentScript);
//             })();
//         </script>
//     `;

//     if (testimonials.length === 0) {
//         return <div>No testimonials available for this space.</div>;
//     }

//     return (
//         <div>
//             <h1>Embed Testimonials for Space: {spaceId}</h1>
//             <p>Copy and paste the script below into your HTML file to display testimonials.</p>
//             <pre
//                 style={{
//                     background: "#f4f4f4",
//                     padding: "10px",
//                     borderRadius: "4px",
//                     overflowX: "auto",
//                 }}
//             >
//                 {generateEmbedScript()}
//             </pre>
//         </div>
//     );
// };

// export default EmbedPage;

import React from 'react'

const page = () => {
    return (
        <div>page</div>
    )
}

export default page