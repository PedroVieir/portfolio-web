type BadgeProps = {
  text: string;
  color?: "blue" | "purple" | "green";
};

const styles = {
  blue: {
    bg: "bg-blueSoft",
    text: "text-blue-600",
  },
  purple: {
    bg: "bg-primarySoft",
    text: "text-primary",
  },
  green: {
    bg: "bg-greenSoft",
    text: "text-emerald-600",
  },
};

export default function Badge({
  text,
  color = "purple",
}: BadgeProps) {
  const style = styles[color];

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold tracking-tight ${style.bg} ${style.text}`}> 
      {text}
    </span>
  );
}
