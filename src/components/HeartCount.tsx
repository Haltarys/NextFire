type HeartCountProps = {
  count: number;
};

export default function HeartCount({ count }: HeartCountProps) {
  return <>❤️ {count < 2 ? `${count} heart` : `${count} hearts`}</>;
}
