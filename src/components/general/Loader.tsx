const Loader = () => {
  return (
    <div className="fixed left-0 top-0 z-[9999] flex h-screen w-full items-center justify-center bg-white">
        <div className="flex-col gap-4 w-full flex items-center justify-center">
          <div
            className="w-20 h-20 border-4 border-transparent text-primary-01 text-4xl animate-spin flex items-center justify-center border-t-primary-01 rounded-full"
          >
            <div
              className="w-16 h-16 border-4 border-transparent text-green-300 text-2xl animate-spin flex items-center justify-center border-t-green-300 rounded-full"
            ></div>
          </div>
          <p className="text-lg font-semibold text-black capitalize">Loading...</p>
        </div>
      </div>
  )
}

export default Loader
