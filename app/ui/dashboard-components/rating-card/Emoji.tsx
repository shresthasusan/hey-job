import Image from "next/image";

interface Props {
  rating: number;
}

const Emoji = ({ rating }: Props) => {
  if (rating > 4) {
    return (
      <Image
        src="/icons/bulls-eye.webp"
        alt="bulls-eye"
        width={40}
        height={40}
      />
    );
  } else if (rating > 3) {
    return (
      <Image
        src="/icons/thumbs-up.webp"
        alt="thumbs-up"
        width={40}
        height={40}
      />
    );
  } else if (rating > 2.5) {
    return <Image src="/icons/meh.webp" alt="meh" width={40} height={40} />;
  } else {
    return <Image src="/icons/sad.png" alt="sad" width={40} height={40} />;
  }
};
export default Emoji;
