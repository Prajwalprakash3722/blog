/* eslint-disable @next/next/no-img-element */
type Props = {
  name: string;
  picture: string;
};

const Avatar = ({ name, picture }: Props) => {
  return (
    <div className="flex items-center">
      <img src={picture} className="w-12 h-12 rounded-full mr-4" alt={name} />
      <div className="font-display text-xl font-bold text-text-heading">{name}</div>
    </div>
  );
};

export default Avatar;
