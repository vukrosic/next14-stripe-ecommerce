import React from 'react'
import Image from 'next/image'

const HeroSection: React.FC = () => {
    return (
        <section className="bg-white text-black">
            <div className="flex p-28 pt-16">
                <div className="w-1/2 pr-8 space-y-4">
                    <h1 className="text-8xl font-black relative z-10">
                        LET'S
                        <br />
                        EXPLORE
                        <br />
                        <span className="relative inline-block">
                            UNIQUE
                            <span className="absolute inset-0 bg-yellow-300 -skew-y-3 -z-10 transform "></span>
                        </span>
                        <br />
                        CLOTHES.
                    </h1>
                    <p className="text-xl font-medium mb-6 text-[#191818]">Live for influential and innovative fashion!</p>
                    <button className="bg-black text-white px-6 py-2 rounded">Shop Now</button>
                </div>
                <div className="w-1/2">
                    <Image
                        src='/images/model.png'
                        alt="Fashion model"
                        width={871}
                        height={784}
                        className="rounded-lg"
                    />
                </div>
            </div>
        </section>
    )
}

export default HeroSection