import React from "react";
import { FaFeatherAlt } from "react-icons/fa";
import PublicationSection from "./PublicationSection";

const About = () => {
    const aboutPoints = [
        "In recent past, Generative AI is one of the most trending topics and applications in every field of Science and Engineering with AI and Machine Intelligence...",
        "Combination of Computational Intelligence and Generative AI techniques can be utilized for generating Electronic Health Records (EHRs)...",
        "In this Conference, we will focus on Math-Model design and generations for improved solutions and decision-making...",
    ];

    const callForPaperPoints = [
        "1st version of CIGAI aims to bring together leading research scientists, academicians, researchers...",
        "This will be a purely research-oriented conference. 8 pages to be submitted by the Author.",
        "It also provides a premier interdisciplinary platform for researchers, practitioners, and educators...",
    ];

    const publicationDetails = [
        "All accepted papers will be published in Conference Proceedings, Scopus Indexed.",
        "Proposal is submitted to 'Springer Proceedings in Mathematics & Statistics' (https://www.springer.com/series/10533), a Scopus-indexed book series for possible publication after the evaluation and screening of all submissions.",
        "Paper Format",
    ];

    return (
        <div className="pt-16 bg-white text-gray-900">
            <div className="w-full flex justify-center mb-10">
                <h2 className="text-4xl font-bold text-center">MARK YOUR CALENDARS</h2>
            </div>

            <div className="flex flex-col lg:flex-row px-6 lg:px-14 gap-8">
                <div className="lg:w-1/2">
                    <h3 className="text-2xl font-semibold mb-4 text-yellow-700">About</h3>
                    <h4 className="text-xl font-semibold mb-6 text-blue-700">The Conference</h4>

                    <div className="space-y-5 text-justify">
                        {aboutPoints.map((point, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <FaFeatherAlt className="text-yellow-500 mt-1 flex-shrink-0" />
                                <p>{point}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-14">
                        <div className="flex items-center gap-4 mb-3">
                            <h5 className="text-sm font-semibold tracking-widest text-gray-400 uppercase">
                                About Research Findings of Authors
                            </h5>
                            <div className="w-20 h-0.5 bg-orange-500"></div>
                        </div>

                        <h3 className="text-3xl font-bold mb-6">CALL FOR PAPER</h3>

                        <div className="space-y-5 text-justify">
                            {callForPaperPoints.map((point, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <FaFeatherAlt className="text-yellow-500 mt-1 flex-shrink-0" />
                                    <p>{point}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full bg-gray-900  text-white py-10 mt-16">
                <div className="max-w-5xl mx-auto px-6 text-left">
                    <h2 className="text-yellow-400 text-xl font-bold">Special Theme</h2> <br></br>
                    <p className="text-lg mt-2 font-bold">Data Science: Unseen patterns and Decision</p>
                </div>
            </div>
            <PublicationSection />
        </div>
    );
};

export default About;