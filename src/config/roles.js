const allRoles = {
  user: ['getUserProfile', 'updateUserProfile'],
  admin: ['getUsers', 'manageUsers', 'getUserProfile', 'manageServices', 'managePlaces', 'updateUserProfile' ],
  staff: ['getUserProfile', 'updateUserProfile']
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
