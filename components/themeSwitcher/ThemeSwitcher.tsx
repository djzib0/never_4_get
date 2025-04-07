const ThemeSwitcher = () => {

  return (
    <div className={`flex items-center w-12 h-6 rounded-full px-1 border border-[#B17F59] dark:border-[#A27B5C] outline-none cursor-pointer transition-all duration-300 dark:bg-[#222222] bg-[#BDDDE4]`}>
      <div className={`w-6 h-6 flex items-center justify-center text-md rounded-full transition-all duration-300 dark:translate-x-4 translate-x-0 before:content-['☀️'] dark:before:content-['🌙']`}>
      </div>
    </div>
  )
}

export default ThemeSwitcher