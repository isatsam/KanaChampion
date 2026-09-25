import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "./Trainers.css";
import { type ReactNode } from "react";

interface Props {
  exercise: ReactNode;
  settings: ReactNode;
}


export function Trainer({ exercise, settings }: Props) {
  return (
    <Tabs selectedTabClassName="tab-clicked-on">
      <TabList className="tab-list">
        <Tab className="tab-list-tab" selectedClassName="tab-list-tab-selected">
          Exercise
        </Tab>
        <Tab className="tab-list-tab" disabledClassName="tab-list-tab-disabled">
          Settings
        </Tab>
      </TabList>

      <TabPanel selectedClassName="tab-selected" className="tab">
        {exercise}
      </TabPanel>
      <TabPanel selectedClassName="tab-selected" className="tab">
        <h1>Settings</h1>
        <div className="settings-container">{settings}</div>
      </TabPanel>
    </Tabs>
  );
}
