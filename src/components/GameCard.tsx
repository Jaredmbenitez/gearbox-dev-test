import Image from 'next/image';
export default function GameCard(props) {
    const discountedPrice = Math.round(props.price * (1 - props.discount / 100));
    return (
        <div className="max-w-sm rounded  max-h-sm overflow-hidden shadow-lg hover:shadow-2xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105">
            <div className="relative h-48 w-full">
                <Image src={props.image_url} alt={props.name} fill />
            </div>
            {props.discount > 0 && (
                <div className="bg-red-500 text-white text-xs font-bold uppercase tracking-wide text-center py-1">
                    {props.discount}% off
                </div>
            )}
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{props.name}</div>
                <p className="text-gray-700 text-base">
                    Genre: {props.genre}
                </p>
                <p className="text-gray-700 text-base">
                    Rating: {Array.from({ length: props.rating }, (_, i) => (
                        <span key={i} className="text-yellow-400">★</span>
                    ))}
                </p>
            </div>
            <div className="px-6 py-2">
                {props.discount ? (
                    <>
                        <s className="text-gray-600">${props.price}</s>
                        <span className="text-red-500 ml-2">${discountedPrice}</span>
                    </>
                ) : (
                    <span className="text-gray-700">${props.price}</span>
                )}
            </div>
            <div className="px-6 ">
                <p className="text-gray-700 text-base">
                    Release Date:
                    <span className="inline-block px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                        {new Date(props.releaseDate).toLocaleDateString()}
                    </span>
                </p>
            </div>
            {props.adminMode && (
                <div className="px-6 py-4">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2" onClick={() => props.handleEditGame(props.id)}>
                        Edit
                    </button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-2" onClick={() => props.handleDeleteGame(props.id)} >
                        Delete
                    </button>
                </div>
            )
            }
        </div >
    )
}

