interface MessageProps {
  color: string;
  text: string;
}

const Message = ({ color, text }: MessageProps) => (
  <h1 className={`text-center my-5 p-5 bg-${color} text-white w-75 mx-auto`}>
    {text}
  </h1>
);

export default Message;
