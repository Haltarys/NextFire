type UserMessageProps = {
  isLoading: boolean;
  isValid: boolean;
  username?: string;
};

export default function UsernameMessage({
  isLoading,
  isValid,
  username,
}: UserMessageProps) {
  if (isLoading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p className="text-success">{username} is available!</p>;
  } else if (username && !isValid) {
    return <p className="text-danger">That username is taken!</p>;
  } else {
    return null;
  }
}
