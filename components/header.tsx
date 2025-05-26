import Image from 'next/image';

const Header=()=>{
    return(
         <header className="bg-green-600 text-white">
        <div className="w-full  mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex   justify-between h-16">

            <div className="flex items-center flex-row  space-x-4">
              <div className="bg-white text-green-600 px-3 py-1 rounded font-bold text-lg">M-PESA</div>
                <div className="flex gap-3  items-center "> 
                    <Image
                      src="/safari.png"
                      alt="Safaricom Logo"
                        width={90}
                        height={60}
                        className="h-8 w-8 rounded-full"
                    />
                     
                </div>
            </div>

    
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-white hover:text-green-200 transition-colors">
                APPLY
              </a>
              <a href="#" className="text-white hover:text-green-200 transition-colors">
                RECOMMEND
              </a>
              <a
                href="#"
                className="bg-white text-green-600 px-4 py-2 rounded font-medium hover:bg-green-50 transition-colors"
              >
                LOGIN
              </a>
            </nav>
          </div>
        </div>
      </header>

    )
}

export default Header;