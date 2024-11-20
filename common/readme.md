# Input Validation Package

This package provides a set of Zod schemas for validating user inputs in various authentication-related scenarios, such as sign-up, sign-in, forgot password, and reset password. It utilizes the powerful Zod library for data validation and type inference.

## Installation

To install the package, run the following command:

```
npm install @abhiram2k03/input-validation
```

## Usage

Import the required schema and type from the package:

```typescript
import { signupSchema, SignupInput } from '@abhiram2k03/input-validation';
```

```javascript
const { signupSchema, SignupInput } = require('@abhiram2k03/input-validation');
```

Then, you can use the schema to validate the input data:

```typescript

try{
  const {username, email, password, cPassword} = signupSchema.parse(req.body);

  // handle the data here as required
  
}
catch (error: any) {
  // If validation fails, return error message
  if (error.errors && error.errors[0].message) {
    const message = error.errors[0].message;
    return res.json({ msg: message });
  }
  // For any other errors, print "Internal Server Error"
  console.error(error); // Log the error for debugging purposes
  return res.json({ msg: "Internal Server Error" });
}
```

You can use the types in the frontend as follows:

```javascript
const [signupData, setSignupData] = useState<SignupInput>({
  username: '',
  email: '',
  password: '',
  cPassword: '',
});

const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  try {
    const response = await axios.post('enter_address_here', { 
      username: signupData.username,
      email: signupData.email,
      password: signupData.password,
      cPassword: signupData.cPassword
     });
  } catch (e) {
    console.log(e);
  }
};


<input type="text"  
  onChange={(e) => {
    setSignupData({
      ...signupData,
      username: e.target.value
    })
  }}
/>

// similarly, all other inputs are validated 

```

## Schemas

The package provides the following schemas:

### `signupSchema`

This schema validates the sign-up input data, ensuring that the `username` is a string, `email` is a valid email address, `password` is a string with a minimum length of 8 characters, and `cPassword` (confirmation password) is a string with a minimum length of 8 characters.

### `signinSchema`

This schema validates the sign-in input data, ensuring that `email` is a valid email address and `password` is a string with a minimum length of 8 characters.

### `forgotPasswordSchema`

This schema validates the forgot password input data, ensuring that `email` is a valid email address.

### `resetPasswordSchema`

This schema validates the reset password input data, ensuring that `password` is a string with a minimum length of 8 characters, and `cPassword` (confirmation password) is a string with a minimum length of 8 characters.

## Type Inference

The package also provides type inference for each schema, allowing you to easily access the validated data types in your TypeScript code. The inferred types are:

- `SignupInput`
- `SigninInput`
- `ForgotPasswordInput`
- `ResetPasswordInput`

## Contributing

Contributions to this package are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the package's GitHub repository.

