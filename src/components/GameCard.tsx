import Image from 'next/image';
export default function GameCard(props) {
    const discountedPrice = Math.round(props.price * (1 - props.discount / 100));
    return (
        <div className="max-w-sm rounded  overflow-hidden shadow-lg">
            <Image src={props.image_url} alt={props.name} layout="responsive" width={200} height={200} />
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
            <div className="px-6 py-4">
                {props.discount ? (
                    <>
                        <s className="text-gray-600">${props.price}</s>
                        <span className="text-red-500 ml-2">${discountedPrice}</span>
                    </>
                ) : (
                    <span className="text-gray-700">${props.price}</span>
                )}
            </div>
            {props.adminMode && (
                <div className="px-6 py-4">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >
                        Edit
                    </button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => props.handleDeleteGame(props.id)} >
                        Delete
                    </button>
                </div>
            )
            }
        </div >
    )
}

