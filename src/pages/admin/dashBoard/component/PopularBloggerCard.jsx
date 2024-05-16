/* eslint-disable react/prop-types */

const PopularBloggerCard = ({ blogger }) => {
  return (
    <div className="  border-[.1px] border-[#F3CEFF] h-full  rounded-[1.8em] bg-[#F3CEFF]   transform transition-transform duration-300 ease-in-out hover:shadow-md  hover:scale-105  ">
      <div className="mt-[4em] mb-[3em] flex  justify-evenly  ">
        {blogger?.email}
        <div className="font-sans font-extrabold">{blogger?.userName}</div>
      </div>
      <div className="font-sans flex justify-evenly mb-[5em]    ">
        <div className="font-bold text-[1.5em]  @[450px]:text-[1.2em] @[800px]:text-[1.7em] ">
          Popularity score:
          {blogger?.popularityScore}
        </div>

        <div className="bg-green-300 text-[1em] opacity-0 ">s</div>
      </div>
    </div>
  );
};

export default PopularBloggerCard;
