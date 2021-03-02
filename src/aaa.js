const schema = Yup.object().shape({
    friends: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string().min(4, 'too short').required('Required'), // these constraints take precedence
          salary: Yup.string().min(3, 'cmon').required('Required'), // these constraints take precedence
        })
      )
      .required('Must have friends') // these constraints are shown if and only if inner constraints are satisfied
      .min(3, 'Minimum of 3 friends'),
  });