import { BigHead } from "@bigheads/core";
import { IEmployee } from "../pages/interfaces";
import { lastName, nickname } from "./names";

/*  4 Tipos de funcionarios

Estagiarios - Juniors - Plenos - Seniors


*/

const employeeStatusExample = [
  ["salaryInit", "salaryLimit"],
  ["reworkInit", "reworkLimit"],
  ["bugInit", "bugLimit"],
  ["storyInit", "storyLimit"],
];

export const employeeGenerator = (
  employeeQt: number,
  employeeType: string
): IEmployee[] => {
  //TODO add Employees Ranges
  const internRanges = [
    [800, 1450],
    [15, 25],
    [10, 20],
    [3, 8],
  ];

  const juniorRange = [
    [1500, 3000],
    [15, 20],
    [10, 15],
    [6, 15],
  ];

  const plenoRange = [
    [3200, 8000],
    [10, 15],
    [8, 15],
    [10, 20],
  ];

  const seniorRange = [
    [8000, 15000],
    [0, 10],
    [0, 10],
    [20, 25],
  ];

  const getRandomizeAttr = (rangeInit: number, rangeLimit: number) => {
    return Math.round(Math.random() * (rangeLimit - rangeInit) + rangeInit);
  };

  const getEmployeeInfo = () => {
    const empName = Math.floor(Math.random() * nickname.length);
    const empLstName = Math.floor(Math.random() * lastName.length);

    return {
      name: nickname[empName] + " " + lastName[empLstName],
      gender: empName <= 100 ? "men" : "woman",
    };
  };

  const populateEmpAttrs = (ranges: any) => {
    const [salaryInit, salaryLimit] = ranges[0];
    const [reworkInit, reworkLimit] = ranges[1];
    const [bugInit, bugLimit] = ranges[2];
    const [storyInit, storyLimit] = ranges[3];

    const { name, gender } = getEmployeeInfo();

    const newEmployee: IEmployee = {
      id: Math.random() * 100,
      name: name,
      salary: getRandomizeAttr(salaryInit, salaryLimit),
      bugRisk: getRandomizeAttr(bugInit, bugLimit),
      reworkRisk: getRandomizeAttr(reworkInit, reworkLimit),
      storyPointsPerSprint: getRandomizeAttr(storyInit, storyLimit),
      storyPointsAllocated: 0,
      tasks: [],
      avatar: avatarGenerator(gender),
    };

    return newEmployee;
  };

  const generateEmployee = (empLevel: string): IEmployee => {
    switch (empLevel) {
      case "intern":
        return populateEmpAttrs(internRanges);
      case "junior":
        return populateEmpAttrs(juniorRange);
      case "pleno":
        return populateEmpAttrs(plenoRange);
      case "senior":
        return populateEmpAttrs(seniorRange);
      default:
        throw Error("Employee Type Wrong");
    }
  };

  const generateEmployeeList = (): IEmployee[] => {
    let employeeList: IEmployee[] = [];

    for (let i = 0; i < employeeQt; i++) {
      if (employeeType) {
        employeeList.push(generateEmployee(employeeType));
      } else {
        throw Error("Employee Type Undefined");
      }
    }

    return employeeList;
  };

  return generateEmployeeList();
};

const randomizeAvatarProps = (items: string[]): any => {
  const randomNum = Math.floor(Math.random() * items.length);
  return items[randomNum];
};

export const avatarGenerator = (gender: string) => {
  // Gender Changes
  let body: "chest" | "breasts";
  let hair: string[] = ["afro", "pixie"];
  let facialHair: string[] = ["none"];

  if (gender === "men") {
    body = "chest";
    hair.push("buzz", "short", "none");
    facialHair.push("stubble", "mediumBeard");
  } else {
    body = "breasts";
    hair.push("bob", "bun", "long");
  }

  const skinTone = ["light", "yellow", "brown", "dark", "red", "black"];
  const hairColor = ["blonde", "orange", "black", "white", "brown", "pink"];
  const clothing = ["shirt", "tankTop", "vneck", "dressShirt"];
  const clothingColor = ["white", "blue", "black", "green", "red"];
  const eyes = ["normal", "leftTwitch", "happy", "content", "squint"];
  const eyebrows = ["raised", "leftLowered", "serious", "angry", "concerned"];
  const mouth = ["grin", "openSmile", "serious"];
  const accessory = ["roundGlasses", "none"];

  return (
    <BigHead
      body={body}
      hair={randomizeAvatarProps(hair)}
      hairColor={randomizeAvatarProps(hairColor)}
      facialHair={randomizeAvatarProps(facialHair)}
      skinTone={randomizeAvatarProps(skinTone)}
      clothing={randomizeAvatarProps(clothing)}
      clothingColor={randomizeAvatarProps(clothingColor)}
      eyebrows={randomizeAvatarProps(eyebrows)}
      eyes={randomizeAvatarProps(eyes)}
      mouth={randomizeAvatarProps(mouth)}
      accessory={randomizeAvatarProps(accessory)}
      lashes={false}
      hat="none"
      graphic="none"
    ></BigHead>
  );
};

export const MOCK_EMPLOYEES: IEmployee[] = [
  ...employeeGenerator(1, "senior"),
  ...employeeGenerator(1, "pleno"),
  ...employeeGenerator(3, "junior"),
  ...employeeGenerator(1, "intern"),
];
