import Image, { StaticImageData } from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../../components/ui/3d-card";

interface FeatureCardProps {
    heading: string;
    subheading: string;
    image: StaticImageData;

}
const FeatureCard: React.FC<FeatureCardProps> = ({ heading, subheading, image }) => {
    return (
        <div>
            <CardContainer className="inter-var bg-gray-500">
                <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                    <CardItem
                        translateZ="50"
                        className="text-xl font-bold text-neutral-600 dark:text-white"
                    >
                        {heading}
                    </CardItem>
                    <CardItem
                        as="p"
                        translateZ="60"
                        className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
                    >
                        {subheading}
                    </CardItem>
                    <CardItem translateZ="100" className="w-full mt-4 mb-4">
                        <Image
                            src={image}
                            height={"10000"}
                            width={"10000"}
                            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                            alt="thumbnail"
                        />
                    </CardItem>

                </CardBody>
            </CardContainer>
        </div>
    )
}

export default FeatureCard