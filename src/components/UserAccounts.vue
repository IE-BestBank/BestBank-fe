<template>
    <div class="jumbotron vertical-center">
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <h1>Accounts</h1>
            <hr />
            <br />
            <!-- Allert Message -->
            <b-alert v-if="showMessage" variant="success" show>{{
              message
            }}</b-alert>
            <!-- b-alert v-if="error" variant="danger" show>{{ error }}</b-alert-->

            <div class="button-container">
              <div class="row">
                <div class="col-md-4">
                  <button
                    type="button"
                    class="btn btn-success btn-sm custom-button"
                    v-b-modal.create-account-modal
                  >
                    Create Account
                  </button>
                </div>
                <div class="col-md-4">
                  <button
                    type="button"
                    class="btn btn-success btn-sm custom-button"
                    v-b-modal.deposit-modal
                  >
                    Deposit
                  </button>
                </div>
                <div class="col-md-4">
                  <button
                    type="button"
                    class="btn btn-success btn-sm custom-button"
                    v-b-modal.transfer-modal
                  >
                    Transfer
                  </button>
                </div>
              </div>
            </div>
            <br /><br />
            <table class="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Account Name</th>
                  <th scope="col">Account Number</th>
                  <th scope="col">Account Balance</th>
                  <th scope="col">Account Currency</th>
                  <th scope="col">Country</th>
                  <th scope="col">Account Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="account in accounts" :key="account.id">
                  <td>{{ account.name }}</td>
                  <td>{{ account.account_number }}</td>
                  <td>{{ account.balance }}</td>
                  <td>{{ account.currency }}</td>
                  <td>{{ account.country }}</td>
                  <td>
                    <span
                      v-if="account.status == 'Active'"
                      class="badge badge-success"
                      >{{ account.status }}</span
                    >
                    <span v-else class="badge badge-danger">{{
                      account.status
                    }}</span>
                  </td>
                  
                  <td>
                    <div class="btn-group" role="group">
                      <button
                        type="button"
                        class="btn btn-info btn-sm"
                        v-b-modal.edit-account-modal
                        @click="editAccount(account)"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        class="btn btn-danger btn-sm"
                        @click="deleteAccount(account)"
                      >
                        Delete
                      </button>
                      <!-- Transfer button -->
                    
                    </div>
                    
                  </td>
                </tr>
              </tbody>
            </table>

            
            <footer class="text-center">
              Copyright &copy; All Rights Reserved.
            </footer>
          </div>
        </div>
        <b-modal
          ref="addAccountModal"
          id="account-modal"
          title="Create a new account"
          hide-backdrop
          hide-footer
        >
          <b-form @submit="onSubmit" class="w-100">
            <b-form-group
              id="form-name-group"
              label="Account Name:"
              label-for="form-name-input"
            >
              <b-form-input
                id="form-name-input"
                type="text"
                v-model="createAccountForm.name"
                placeholder="Account Name"
                required
              >
              </b-form-input>
            </b-form-group>
            <b-form-group
              id="form-country-group"
              label="Country"
              label-for="form-country-input"
            >
              <b-form-input
                id="form-country-input"
                type="text"
                v-model="createAccountForm.country"
                placeholder="Country"
                required
              >
              </b-form-input>
            </b-form-group>
            <b-form-group
              id="form-currency-group"
              label="Currency:"
              label-for="form-currency-input"
            >
              <b-form-input
                id="form-currency-input"
                type="text"
                v-model="createAccountForm.currency"
                placeholder="$ or €"
                required
              >
              </b-form-input>
            </b-form-group>

            <b-button type="submit" variant="outline-info">Submit</b-button>
          </b-form>
        </b-modal>
        <!-- End of Modal for Create Account-->

        <!-- Start of Modal for Edit Account-->
        <b-modal
          ref="editAccountModal"
          id="edit-account-modal"
          title="Edit the account"
          hide-backdrop
          hide-footer
        >
          <b-form @submit="onSubmitUpdate" class="w-100">
            <b-form-group
              id="form-edit-name-group"
              label="Account Name:"
              label-for="form-edit-name-input"
            >
              <b-form-input
                id="form-edit-name-input"
                type="text"
                v-model="editAccountForm.name"
                placeholder="Account Name"
                required
              >
              </b-form-input>
            </b-form-group>
            <b-button type="submit" variant="outline-info">Update</b-button>
          </b-form>
        </b-modal>
        <!-- Deposit Modal -->
        <b-modal id="deposit-modal" ref="deposit-modal" title="Deposit" hide-footer>
      <b-form @submit.prevent="make_deposit">
        <div class="form-group">
          <label for="account_number">Account Number</label>
          <input type="text" class="form-control" id="account_number" v-model="depositForm.account_number" required>
          <b-form-input
                id="form-edit-name-input"
                type="text"
                v-model="depositForm.account_number"
                placeholder="Account Number"
                required
              >
        </b-form-input>
        </div>
        <div class="form-group">
          <label for="deposit-amount">Amount</label>
          <input type="number" class="form-control" id="deposit-amount" v-model="depositForm.amount" required>
          <b-form-input
                id="deposit-amount"
                type="number"
                v-model="depositForm.amount"
                placeholder="Amount"
                required  
                ></b-form-input>
        </div>
        <button type="submit" class="btn btn-primary">Deposit</button>
      </b-form>
    </b-modal>
    <!-- End of deposit modal-->
    <!-- Transfer Modal -->
     
    
    <b-modal id="transfer-modal" title="Transfer Amount" hide-footer>
      <form @submit.prevent="transfer">
        <div class="form-group">
          <label for="toAccount">To Account Number</label>
          <input type="text" class="form-control" id="toAccount" v-model="toAccount" required>
        </div>
        <div class="form-group">
          <label for="transfer-amount">Amount</label>
          <input type="number" class="form-control" id="transfer-amount" v-model="amount" required>
        </div>
        <button type="submit" class="btn btn-primary">Transfer</button>
      </form>
    </b-modal>
     <!-- End of Transfer modal-->
      </div>
    </div>
  </template>

  <script>
  import axios from "axios";
  export default {
    name: "UserAccounts",
    data() {
      return {
        user_id: this.$route.params.userId,
        accounts: [],
        createAccountForm: {
          name: "",
          country: "",
          currency: "",
        },
        editAccountForm: {
          id: "",
          name: "",
        },
        depositForm: {
          account_number: "",
          amount: 0,
        },
        showMessage: false,
        message: "",
        toAccount: '',
        transferAmount: '',
        error: ''
      };

    },
    methods: {
      /***************************************************
       * RESTful requests
       ***************************************************/

      //GET function
        RESTgetAccounts() {
            console.log(process.env.VUE_APP_ROOT_URL);
            console.log('user id', this.user_id);
            const path = `${process.env.VUE_APP_ROOT_URL}/users/${this.user_id}`;
            axios.get(path)
                .then((response) => {
                    console.log(response.data)
                    this.accounts = response.data.accounts;
                })
                .catch((error) => {
                    console.error(error);
                });
      },

      // POST function
      RESTcreateAccount(payload) {
        const path = `${process.env.VUE_APP_ROOT_URL}/accounts`;
        axios
          .post(path, payload)
          .then((response) => {
            this.RESTgetAccounts();
            // For message alert
            this.message = "Account Created succesfully!";
            // To actually show the message
            this.showMessage = true;
            // To hide the message after 3 seconds
            setTimeout(() => {
              this.showMessage = false;
            }, 3000);
          })
          .catch((error) => {
            console.error(error);
            this.RESTgetAccounts();
          });
      },

      // Update function
      RESTupdateAccount(payload, accountId) {
        const path = `${process.env.VUE_APP_ROOT_URL}/accounts/${accountId}`;
        axios
          .put(path, payload)
          .then((response) => {
            this.RESTgetAccounts();
            // For message alert
            this.message = "Account Updated succesfully!";
            // To actually show the message
            this.showMessage = true;
            // To hide the message after 3 seconds
            setTimeout(() => {
              this.showMessage = false;
            }, 3000);
          })
          .catch((error) => {
            console.error(error);
            this.RESTgetAccounts();
          });
      },

      // Delete account
      RESTdeleteAccount(accountId) {
        const path = `${process.env.VUE_APP_ROOT_URL}/accounts/${accountId}`;
        axios
          .delete(path)
          .then((response) => {
            this.RESTgetAccounts();
            // For message alert
            this.message = "Account Deleted succesfully!";
            // To actually show the message
            this.showMessage = true;
            // To hide the message after 3 seconds
            setTimeout(() => {
              this.showMessage = false;
            }, 3000);
          })
          .catch((error) => {
            console.error(error);
            this.RESTgetAccounts();
          });
      },

      /***************************************************
       * FORM MANAGEMENT
       * *************************************************/

      // Initialize forms empty
      initForm() {
        this.createAccountForm.name = "";
        this.createAccountForm.country = "";
        this.createAccountForm.currency = "";

        this.editAccountForm.id = "";
        this.editAccountForm.name = "";
      },

      // Handle submit event for create account
      onSubmit(e) {
        e.preventDefault(); //prevent default form submit form the browser
        this.$refs.addAccountModal.hide(); //hide the modal when submitted
        const payload = {
          name: this.createAccountForm.name,
          country: this.createAccountForm.country,
          currency: this.createAccountForm.currency,
          user_id: this.user_id,
        };
        console.log('submit payload', payload);
        this.RESTcreateAccount(payload);
        this.initForm();
      },

      // Handle submit event for edit account
      onSubmitUpdate(e) {
        e.preventDefault(); //prevent default form submit form the browser
        this.$refs.editAccountModal.hide(); //hide the modal when submitted
        const payload = {
          name: this.editAccountForm.name,
        };
        this.RESTupdateAccount(payload, this.editAccountForm.id);
        this.initForm();
      },

      // Handle edit button
      editAccount(account) {
        this.editAccountForm = account;
      },

      // Handle Delete button
      deleteAccount(account) {
        this.RESTdeleteAccount(account.id);
      },

      // Deposit
      make_deposit() {
        const path = `${process.env.VUE_APP_ROOT_URL}/deposit`;
      const payload = {
        account_number: this.depositForm.account_number,
        amount: this.depositForm.amount,
  };
    console.log('payload', payload);
  axios.post(path, payload)
    .then((response) => {
      console.log("Deposit success, now closing modal and updating view");
      this.RESTgetAccounts(); // Refresh the account list to reflect new balance
      this.message = "Deposit made successfully!";
      this.showMessage = true;

      // Close the modal after deposit is made
      this.$refs['deposit-modal'].hide(); // Close the modal using $refs or $bvModal.hide()

      // Reset form values
      this.depositForm.account_number = '';
      this.depositForm.amount = 0;

      setTimeout(() => {
        this.showMessage = false;
      }, 3000);
    })
    .catch((error) => {
      console.error("Deposit failed: ", error);
      this.message = "An error occurred during deposit!";
      this.showMessage = true;

      setTimeout(() => {
        this.showMessage = false;
      }, 3000);
    });
},


    },

    /***************************************************
     * LIFECYClE HOOKS
     ***************************************************/
    created() {
      this.RESTgetAccounts();
    },
  };
  </script>
<style scoped>
#deposit-transfer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 50px;
  background-color: lightblue;
}
.custom-button {
  margin-right: 10px; /* Adjust the spacing as needed */
  margin-bottom: 10px; /* Add bottom margin if buttons are stacked vertically */
}
</style>