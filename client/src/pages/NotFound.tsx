import Page from "../components/Page/Page";
import Button from "../components/Button/Button";

export default function NotFound() {
  return (
    <Page narrow>
      <h1>This page doesn’t exist.</h1>
      <p>The link may be old or mistyped.</p>
      <div>
        <Button to="/lessons">Go to the lessons</Button>
      </div>
    </Page>
  );
}