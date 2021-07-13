# Select Component

Takes in a set of options and provides a selector dropdown for the user.

### Types

```tsx
export type SelectOptionType = {
  label: string
  value?: string
}
```

### Props

- `placeholder?: string`
- `options: SelectOptionType[]`
- `selectedOption?: SelectOptionType`
- `onChange?: (option?: SelectOptionType) => void`
- `maxHeight?: number`

---

## Uses

This is used for a simple uniform dropdown to be used throughout the application. Has the ability to have a mapped label/value combo in order to allow each the developers and users a clear understanding of what is being selected

```tsx
const fixturePaymentProfiles = [
  {
    "_id": "klsdjaf839ahds",
    "cc_details": {
      "nick_name": "card 1",
      "first_name": "Lyra",
      "last_name": "Silvertongue",
      "last_four": "8973",
      "exp_date": "8/2019"
    },
    "cc_address": {
      "address": "1234 Street Ave",
      "city": "Louisville",
      "state": "KY",
      "zip": "40241"
    }
  },
  {
    "_id": "asdfsdsfds",
    "cc_details": {
      "nick_name": "card 2",
      "first_name": "Iorek",
      "last_name": "Byrnison",
      "last_four": "3993",
      "exp_date": "9/2020"
    },
    "cc_address": {
      "address": "43534 Avenue St",
      "city": "Louisville",
      "state": "KY",
      "zip": "40241"
    }
  }
]

const [profileSelected, setProfileSelected] = useState<
    SelectOptionType | undefined>()
<Select
    placeholder="Select card"
    selectedOption={profileSelected}
    options={fixturePaymentProfiles.map((profile) => {
    return { label: profile.cc_details.nick_name }
    })}
    onChange={(profile) => setProfileSelected(profile)}
    maxHeight={200}
/>
```
