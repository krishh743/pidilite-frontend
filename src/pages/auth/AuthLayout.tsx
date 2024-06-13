import React, { ReactNode } from 'react';

import LoginArrow from "../../../src/assets/images/LoginArrow.webp";
import LoginBG from "../../../src/assets/images/LoginBG.webp";

interface Props {
  children?: ReactNode;
}

const AuthLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className=' md:bg-[#EAEAEA] z-10 overflow-y-hidden relative'>
      <div className='hidden md:block w-full top-10 absolute z-20'>
        <div className=' w-1/4'>
          <div className='w-full flex justify-center items-center '>
             {/* <img src={LoginArrow} alt='LoginBG ' className=' w-full' /> */}
          </div>
        </div>
      </div>
      <div className=' hidden md:block w-full bottom-0 absolute z-20'>
        <div className=' h-1/2 xl:translate-y-20'>
          <div className='w-full flex h-[100vh] justify-center items-center '>
             <img src={"https://img.freepik.com/free-vector/futuristic-background-design_23-2148503793.jpg?size=626&ext=jpg&ga=GA1.1.44546679.1716940800&semt=ais_user"} 
             alt='LoginBG ' className=' w-full h-full md:h-full' />
          </div>
        </div>
      </div>
      <span className='z-50'>{children}</span>
    </div>
  );
};
export default AuthLayout;