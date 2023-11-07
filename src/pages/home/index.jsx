import TweetLink from "../../components/TweetLink";
import Tweet from "../../components/Tweet";
import HomeHeader from "../../components/homecomp/HomeHeader";
import HomeFooter from "../../components/homecomp/HomeFooter";

export default function Home() {
  return (
    <>
      <HomeHeader />

      <Tweet />
      <TweetLink />
      <HomeFooter page="home" />
    </>
  );
}
