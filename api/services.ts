/// manage all services endpoints with the BE

import instance from "."

////////// "Get your Profile" API

const GetProfile = async () => {
  const response = await instance.get("/mini-project/api/auth/me");
  return response.data;
};

///// "Get Your Transactions" 
const GetTransactions = async () => {
  const response = await instance.get("/mini-project/api/transactions/my");
  return response.data;
};

////// "Get all Users"
const GetAllUsers = async () => {
  const response = await instance.get("/mini-project/api/auth/users");
  return response.data;
};

/////// "Update your profile"

const UpdateProfile = async () => {
  const response = await instance.put("/mini-project/api/auth/profile");
  return response.data;
};

////// "Deposit to your account"

const DepositToAccount = async () => {
  const response = await instance.put("/mini-project/api/transactions/deposit");
  return response.data;
};
  ///// "Withdraw from your account"

const withdrawFromAccount = async () => {
  const response = await instance.put("/mini-project/api/transactions/withdraw");
  return response.data;
};

//////// Transfer to another user from my account

const TransferfromMYAcc = async () => {
  const response = await instance.put("/mini-project/api/transactions/transfer/<username>");
  return response.data;
};


////// Get User Info by user ID
const GetUserInfo = async () => {
  const response = await instance.get("/mini-project/api/auth/user/<userId>");
  return response.data;
};



export {GetProfile, GetTransactions, GetAllUsers, UpdateProfile,DepositToAccount, withdrawFromAccount,TransferfromMYAcc, GetUserInfo};

