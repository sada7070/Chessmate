interface OnClick {
    onClick: () => void;
    name: string;
}

export const Button = ({onClick, name}: OnClick) => {
    return <div>
        <button type="button" onClick={onClick} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-lg px-6 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:border-gray-700 cursor-pointer">
            {name}
        </button>
    </div>
}