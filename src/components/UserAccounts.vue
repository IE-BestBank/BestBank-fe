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

            <button
              type="button"
              class="btn btn-success btn-sm"
              v-b-modal.account-modal
            >
              Create Account
            </button>
            <button
            type="button"
            class="btn btn-info btn-sm"
            v-b-modal.deposit-modal
            >
                Deposit
            </button>
            <button
            type="button"
            class="btn btn-info btn-sm"
            v-b-modal.transfer-modal
            >
                Transfer Money
            </button>
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
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Transaction ID</th>
                        <th scope="col">Sender Account</th>
                        <th scope="col">Receiver Account</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="transaction in transactions" :key="transaction.id">
                        <td>{{ transaction.id }}</td>
                        <td>{{ transaction.sender_account_number }}</td>
                        <td>{{ transaction.receiver_account_number }}</td>
                        <td>{{ transaction.amount }}</td>
                        <td>{{ transaction.date }}</td>
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
        <!-- End of Modal for Edit Account-->
         <!-- Start of Modal for Deposit-->
        <b-modal
        ref="depositModal"
        id="deposit-modal"
        title="Deposit to the account"
        hide-backdrop
        hide-footer
        >
        <b-form @submit="onSubmitDeposit" class="w-100">
            <b-form-group
              id="form-deposit-account-number"
              label="Account Number:"
              label-for="form-deposit-account-number-input"
            >
              <b-form-input
                id="form-deposit-account-number-input"
                type="text"
                v-model="depositForm.account_number"
                placeholder="Account Number"
                required
              >
              </b-form-input>
            </b-form-group>
            <b-form-group
              id="form-deposit-amount"
              label="Amount:"
              label-for="form-deposit-amount-input"
            >
              <b-form-input
                id="form-deposit-amount-input"
                type="number"
                v-model="depositForm.amount"
                placeholder="Amount"
                required
              >
              </b-form-input>
            </b-form-group>
            <b-button type="submit" variant="outline-info">Make deposit</b-button>
          </b-form>
        </b-modal>
        <!-- End of Modal for Deposit-->
        <!-- Start of Modal for Transfer-->
        <b-modal
        ref="transferModal"
        id="transfer-modal"
        title="Transfer money"
        hide-backdrop
        hide-footer
        >
        <b-form @submit="onSubmitTransfer" class="w-100">
            <b-form-group
              id="form-transfer-sender-account-number"
              label="Account Number (sender):"
              label-for="form-transfer-sender-account-number-input"
            >
              <b-form-input
                id="form-transfer-sender-account-number-input"
                type="text"
                v-model="transferForm.sender_account_number"
                placeholder="Account Number"
                required
              >
              </b-form-input>
            </b-form-group>
            <b-form-group
              id="form-transfer-receiver-account-number"
              label="Account Number (receiver):"
              label-for="form-transfer-receiver-account-number-input"
            >
              <b-form-input
                id="form-transfer-receiver-account-number-input"
                type="text"
                v-model="transferForm.receiver_account_number"
                placeholder="Account Number"
                required
              >
              </b-form-input>
            </b-form-group>
            <b-form-group
              id="form-transfer-amount"
              label="Amount:"
              label-for="form-transfer-amount-input"
            >
              <b-form-input
                id="form-transfer-amount-input"
                type="number"
                v-model="transferForm.amount"
                placeholder="Amount"
                required
              >
              </b-form-input>
            </b-form-group>
            <b-button type="submit" variant="outline-info">Transfer money</b-button>
          </b-form>
        </b-modal>
        <!-- End of Modal for Transfer-->
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
        transactions: [],
        createAccountForm: {
          name: "",
          country: "",
          currency: "",
        },
        editAccountForm: {
          account_number: "",
          name: "",
        },
        depositForm: {
          account_number: "",
          amount: 0,
        },
        transferForm: {
          sender_account_number: "",
          receiver_account_number: "",
          amount: 0,
        },
        showMessage: false,
        message: "",
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

      RESTgetTransactions() {
        const path = `${process.env.VUE_APP_ROOT_URL}/transactions/${this.user_id}`;
        axios
          .get(path)
          .then((response) => {
            console.log('response', response.data);

            const transactions = response.data.transactions.map((transaction) => {
              return {
                id: transaction.id,
                sender_account_number: transaction.sender_account.account_number,
                receiver_account_number: transaction.receiver_account.account_number,
                amount: transaction.amount,
                date: transaction.timestamp,
              };
            });

            console.log('transactions', transactions);
            this.transactions = transactions;
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
            this.RESTgetTransactions();
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
            this.RESTgetTransactions();
          });
      },

      // Update function
      RESTupdateAccount(payload, accountId) {
        const path = `${process.env.VUE_APP_ROOT_URL}/accounts/${accountId}`;
        axios
          .put(path, payload)
          .then((response) => {
            this.RESTgetAccounts();
            this.RESTgetTransactions();
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
            this.RESTgetTransactions();
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
            this.RESTgetTransactions();
          });
      },

        // Deposit function
        RESTdeposit(payload) {
            const path = `${process.env.VUE_APP_ROOT_URL}/deposit`;
            axios
            .post(path, payload)
            .then(response => {
                this.RESTgetAccounts();
                this.RESTgetTransactions();
                // For message alert
                this.message = "Deposit made succesfully!";
                // To actually show the message
                this.showMessage = true;
                // To hide the message after 3 seconds
                setTimeout(() => {
                this.showMessage = false;
                }, 3000);
            })
            .catch(error => {
                console.error(error);
                this.RESTgetAccounts();
                this.RESTgetTransactions();
            });
        },

        // Transfer function
        RESTtransfer(payload) {
            const path = `${process.env.VUE_APP_ROOT_URL}/transactions`;
            axios
            .post(path, payload)
            .then(response => {
                this.RESTgetAccounts();
                this.RESTgetTransactions();
                // For message alert
                this.message = "Transfer made succesfully!";
                // To actually show the message
                this.showMessage = true;
                // To hide the message after 3 seconds
                setTimeout(() => {
                this.showMessage = false;
                }, 3000);
            })
            .catch(error => {
                console.error(error);
                this.RESTgetAccounts();
                this.RESTgetTransactions();
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

        this.depositForm.account_number = "";
        this.depositForm.amount = 0;

        this.transferForm.sender_account_number = "";
        this.transferForm.receiver_account_number = "";
        this.transferForm.amount = 0;
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

        // Handle submit event for deposit
        onSubmitDeposit(e) {
            e.preventDefault(); //prevent default form submit form the browser
            this.$refs.depositModal.hide(); //hide the modal when submitted
            const payload = {
                account_number: this.depositForm.account_number,
                amount: Number(this.depositForm.amount),
            };
            this.RESTdeposit(payload);
            this.initForm();
        },

        // Handle submit event for transfer
        onSubmitTransfer(e) {
            e.preventDefault(); //prevent default form submit form the browser
            this.$refs.transferModal.hide(); //hide the modal when submitted
            const payload = {
                sender_account_number: this.transferForm.sender_account_number,
                receiver_account_number: this.transferForm.receiver_account_number,
                amount: Number(this.transferForm.amount),
            };
            console.log('submit payload', payload);
            this.RESTtransfer(payload);
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
    },

    /***************************************************
     * LIFECYClE HOOKS
     ***************************************************/
    created() {
      this.RESTgetAccounts();
      this.RESTgetTransactions();
    },
  };
  </script>
