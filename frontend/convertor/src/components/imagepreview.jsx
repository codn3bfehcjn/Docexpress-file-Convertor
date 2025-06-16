import React from "react";
import { useimagepathstore } from "../../store/imgpathstore";
export default function Imagepreview() {
    const path = useimagepathstore((state) => state.paths);
    return (

        <section className="flex justify-center flex-wrap gap-2 mb-3">
            {path.map((path, index) => (
                <figure
                    key={index}
                    className="p-1 rounded-xl bg-white shadow-xl gap-4"
                >
                    {path ? (
                        <span className="group">
                            <img
                                src={`http://localhost:3000/${path}`}
                                width={190}
                                height={170}
                                className="rounded-md p-2"
                            />
                        </span>
                    ) : (
                        <figcaption className="text-center text-gray-500">
                            No image found.
                        </figcaption>
                    )}
                </figure>
            ))}
        </section>
    )
}