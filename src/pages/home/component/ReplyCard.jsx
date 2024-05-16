/* eslint-disable react/prop-types */
const ReplyCard = ({ data, handleShowReply }) => {
  return (
    <div className="p-4 border-t border-slate-400">
      <div className="flex items-start space-x-2 mt-4">
        <img
          className="w-10 h-10 rounded-full"
          src={data?.user?.imageName}
          alt={data?.user?.userName}
        />
        <div className="bg-black  rounded-lg p-2 flex-1">
          <p className="text-white">
            <strong>{data?.appUser?.userName}</strong>
          </p>
          <div className="flex justify-end text-white"></div>
          <p className="text-white">{data?.content}</p>
        </div>
      </div>
      <div
        className="cursor-pointer    hover:border-black flex justify-end"
        onClick={() => handleShowReply(data)}
      >
        <div className="hover:bg-slate-300">reply</div>
      </div>
    </div>
  );
};

export default ReplyCard;
