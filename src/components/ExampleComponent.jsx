import * as React from "react";
import { useAddToHomescreenPrompt } from "./useAddToHomescreenPrompt";
import { Button } from 'framework7-react'


export function ExampleComponent() {
  const [prompt, promptToInstall] = useAddToHomescreenPrompt();
  const [isVisible, setVisibleState] = React.useState(false);

  const hide = () => setVisibleState(false);

  React.useEffect(
    () => {
      if (prompt) {
        setVisibleState(true);
      }
    },
    [prompt]
  );

  if (!isVisible) {
    return <div />;
  }

  return (
    <div onClick={hide} style={{zIndex: 1000, position: 'absolute', width: '100%', margin: '0 auto', bottom: '25px'}}>
      <Button style={{left: '100px', width: '250px'}} fill raised onClick={promptToInstall}>HINZUFÜGEN ZUM HOMESCREEN</Button>
    </div>
  );
}
