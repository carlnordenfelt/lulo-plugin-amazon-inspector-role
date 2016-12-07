# lulo Amazon Inspector Role

lulo Amazon Inspector Role associates Amazon Inspector with the provided IAM Role.

lulo Amazon Inspector Role is a [lulo](https://github.com/carlnordenfelt/lulo) plugin

# Installation
```
npm install lulo-plugin-amazon-inspector-role --save
```

## Usage
### Properties
* RoleArn: The IAM Role arn you want to associate Amazon Inspector with.

### Return Values
None

### Required IAM Permissions
The Custom Resource Lambda requires the following permissions for this plugin to work:
```
{
   "Effect": "Allow",
   "Action": [
        "inspector:RegisterCrossAccountAccessRole"
   ],
   "Resource": "*"
}
```

## Notes
Delete on this resource has no impact.
Amazon Inspector will still be associated with the IAM Role.

## License
[The MIT License (MIT)](/LICENSE)

## Change Log
[Change Log](/CHANGELOG.md)
