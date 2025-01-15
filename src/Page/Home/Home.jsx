import useAuth from "@/Hooks/useAuth";

const Home = () => {
  const {name} = useAuth()
  return (
    <div>
      <h1>this is home page</h1>
    </div>
  );
};

export default Home;
