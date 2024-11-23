<!-- Sample Admin Portal -->
<template>

    <div class="jumbotron vertical-center">
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <h1>Admin Portal</h1>
            <div><router-link to="/register" class="link-button">Register new account</router-link></div>
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
              v-b-modal.user-modal
            >
              Create User
            </button>
            <br /><br />
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Username</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Number of Accounts</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.id">
                        <td>{{ user.username }}</td>
                        <td>{{ user.created_at }}</td>
                        <td>{{ user.num_accounts }}</td>
                        <td>
                            <div class="btn-group" role="group">
                                <button
                                    type="button"
                                    class="btn btn-info btn-sm"
                                    v-b-modal.edit-user-modal
                                    @click="editUser(user)"
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    class="btn btn-danger btn-sm"
                                    @click="deleteUser(user)"
                                >
                                    Delete
                                </button>
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
          ref="addUserModal"
          id="user-modal"
          title="Create a new user"
          hide-backdrop
          hide-footer
        >
          <b-form @submit="onSubmit" class="w-100">
            <b-form-group
              id="form-username-group"
              label="Username"
              label-for="form-username-input"
            >
              <b-form-input
                id="form-username-input"
                type="text"
                v-model="createUserForm.username"
                placeholder="Username"
                required
              >
              </b-form-input>
            </b-form-group>
            <b-form-group
              id="form-password-group"
              label="Password"
              label-for="form-password-input"
            >
              <b-form-input
                id="form-password-input"
                type="text"
                v-model="createUserForm.password"
                placeholder="Password"
                required
              >
              </b-form-input>
            </b-form-group>
            <b-button type="submit" variant="outline-info">Submit</b-button>
          </b-form>
        </b-modal>
        <!-- End of Modal for Create User-->
        <!-- Start of Modal for Edit User-->
        <b-modal
          ref="editUserModal"
          id="edit-user-modal"
          title="Edit User"
          hide-backdrop
          hide-footer
        >
          <b-form @submit="onSubmitUpdate" class="w-100">
            <b-form-group
              id="form-edit-username-group"
              label="Username"
              label-for="form-edit-username-input"
            >
              <b-form-input
                id="form-edit-username-input"
                type="text"
                v-model="editUserForm.new_username"
                placeholder="New username"
              >
              </b-form-input>
            </b-form-group>
            <b-form-group
              id="form-edit-password-group"
              label="Password"
              label-for="form-edit-password-input"
            >
              <b-form-input
                id="form-edit-password-input"
                type="text"
                v-model="editUserForm.new_password"
                placeholder="New password"
              >
              </b-form-input>
            </b-form-group>
            <b-button type="submit" variant="outline-info">Update</b-button>
          </b-form>
        </b-modal>
      </div>
    </div>
  </template>

  <script>
  import axios from "axios";
  export default {
    name: "UserAccounts",
    data() {
      return {
        admin_id: Number(this.$route.params.adminId),
        accounts: [],
        users: [],
        createUserForm: {
            username: "",
            password: ""
        },

        editUserForm: {
            new_username: "",
            new_password: ""
        },

        createAccountForm: {
          name: "",
          country: "",
          currency: "",
        },

        editAccountForm: {
          id: "",
          name: "",
        },
        showMessage: false,
        message: "",
      };
    },
    methods: {
      /***************************************************
       * RESTful requests
       ***************************************************/


      // GET function
      RESTgetUsers() {
        const path = `${process.env.VUE_APP_ROOT_URL}/admin/users`;
        const params = {
            admin_id: this.admin_id
        }

        axios
          .get(path, { params })
          .then((response) => {
            const users = response.data.users.map((user) => {
                return {
                    id: user.id,
                    username: user.username,
                    created_at: user.created_at,
                    num_accounts: user.accounts.length
                }
            })
            this.users = users;
          })
          .catch((error) => {
            console.error(error);
          });
      },

      // POST function
      RESTcreateUser(payload) {
        const path = `${process.env.VUE_APP_ROOT_URL}/admin/users`;
        axios
            .post(path, payload)
            .then((response) => {
                console.log('path', path, 'response', response.data);
                this.RESTgetUsers();
                // For message alert
                this.message = "User Created succesfully!";
                // To actually show the message
                this.showMessage = true;
                // To hide the message after 3 seconds
                setTimeout(() => {
                this.showMessage = false;
                }, 3000);
            })
            .catch((error) => {
                console.error(error);
                this.RESTgetUsers();
            });
      },

      // Update user
      RESTupdateUser(payload, user_id) {
        const path = `${process.env.VUE_APP_ROOT_URL}/admin/users/${user_id}`;

        axios
            .put(path, payload)
            .then((response) => {
                this.RESTgetUsers();
                // For message alert
                this.message = "User Updated succesfully!";
                // To actually show the message
                this.showMessage = true;
                // To hide the message after 3 seconds
                setTimeout(() => {
                this.showMessage = false;
                }, 3000);
            })
            .catch((error) => {
                console.error(error);
                this.RESTgetUsers();
            });
      },

      RESTdeleteUser(user_id) {
        const path = `${process.env.VUE_APP_ROOT_URL}/admin/users/${user_id}`;
        const params = {
            admin_id: this.admin_id
        }
        axios
            .delete(path, { params })
            .then((response) => {
                this.RESTgetUsers();
                // For message alert
                this.message = "User Deleted succesfully!";
                // To actually show the message
                this.showMessage = true;
                // To hide the message after 3 seconds
                setTimeout(() => {
                this.showMessage = false;
                }, 3000);
            })
            .catch((error) => {
                console.error(error);
                this.RESTgetUsers();
            });
      },


      /***************************************************
       * FORM MANAGEMENT
       * *************************************************/

      // Initialize forms empty
      initForm() {
        this.createUserForm.username = "";
        this.createUserForm.password = "";

        this.editUserForm.new_username = "";
        this.editUserForm.new_password = "";

      },

      // Handle submit event for create account
      onSubmit(e) {
        e.preventDefault(); //prevent default form submit form the browser
        this.$refs.addUserModal.hide(); //hide the modal when submitted

        let payload = {
          admin_id: this.admin_id,
          username: this.createUserForm.username,
            password: this.createUserForm.password
        };
        this.RESTcreateUser(payload);
        this.initForm();
      },

      // Handle submit event for edit account
      onSubmitUpdate(e) {
        e.preventDefault(); //prevent default form submit form the browser
        this.$refs.editUserModal.hide(); //hide the modal when submitted
        const payload = {
            admin_id: this.admin_id,
            new_username: this.editUserForm.new_username || "",
            new_password: this.editUserForm.new_password || ""
        };

        console.log('payload', payload);
        this.RESTupdateUser(payload, this.editUserForm.id);
        this.initForm();
      },


      // handle edit button
        editUser(user) {
            this.editUserForm = user;
        },

        // handle delete button
        deleteUser(user) {
            this.RESTdeleteUser(user.id);
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
      this.RESTgetUsers();
    },
  };
  </script>
