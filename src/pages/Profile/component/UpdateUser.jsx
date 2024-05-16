/* eslint-disable react/prop-types */
 

const UpdateUser = ({ loading,update, formState, handleInputChange,handleUpdate}) => {
  return (
    <div>
      <form
        key={update ? "updateSuccess" : "updateFailure"}
        className="mt-8 space-y-6"
        onSubmit={handleUpdate}
      >
        <div className="rounded-md shadow-sm  grid grid-flow-col gap-5">
          <div>
            <label htmlFor="Username" className="sr-only">
              Username
            </label>
            <input
              id="Username"
              name="userName"
              type="text"
              required
              className="input w-full"
              placeholder="Username"
              value={formState.userName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="input w-full"
              placeholder="Email "
              value={formState.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="Password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="input w-full"
              placeholder="password"
              value={formState.password}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-slate-300 p-2 rounded-lg hover:shadow-lg w-full"
        >
          {loading ? "Updating" : "Update"}
        </button>
      </form>
    </div>
  );
};

export default UpdateUser