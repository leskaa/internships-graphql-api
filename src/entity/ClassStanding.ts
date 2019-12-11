import { registerEnumType } from 'type-graphql';

enum ClassStanding {
  HighSchool = 'High School',
  BootCamp = 'Boot Camp',
  Freshman = 'Freshman',
  Sophomore = 'Sophomore',
  Junior = 'Junior',
  Senior = 'Senior',
  GradStudent = 'Grad Student',
}

registerEnumType(ClassStanding, {
  name: 'ClassStanding', // this one is mandatory
  description: "Student's current year", // this one is optional
});

export default ClassStanding;
