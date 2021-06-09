import React from "react";

const names = [
  "Adele Overmyer",
  "Ward Babst",
  "Santiago Guillaume",
  "Earnest Sullivan",
  "Pearlie Picou",
  "Armandina Scholz",
  "Zachery Crocket",
  "Cleo Vermillion",
  "Ethelyn Tirrell",
  "Rayford Radosevich",
  "Caroll Baize",
  "Dede Grippo",
  "Carlos Granville",
  "Viva Weingartner",
  "Shala Crossno",
  "Luther Hamernik",
  "Sonia Chiodo",
  "Nidia Colucci",
  "Rosanna Chevalier",
  "Lorenza Strickler",
];

const SortButton = (props) => {
  return (
    <div className="sort-button">
      <i
        className={
          props.sortOrder.sortDir === "up" &&
          props.sortParam === props.sortOrder.sortName
            ? "fas fa-chevron-circle-up fa-sm sort-order-active"
            : "fas fa-chevron-circle-up fa-sm"
        }
        onClick={() =>
          props.setSortOrder({
            sortDir: "up",
            sortName: props.sortParam,
          })
        }
      ></i>
      <i
        className={
          props.sortOrder.sortDir === "down" &&
          props.sortParam === props.sortOrder.sortName
            ? "fas fa-chevron-circle-down fa-sm sort-order-active"
            : "fas fa-chevron-circle-down fa-sm"
        }
        onClick={() =>
          props.setSortOrder({
            sortDir: "down",
            sortName: props.sortParam,
          })
        }
      ></i>
    </div>
  );
};

const SearchForm = (props) => {
  const [formState, setFormState] = React.useState(" ");

  const handleChange = (e) => {
    setFormState(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.setSearchTerm(formState);
    setFormState("");
  };

  return (
    <div className="search-container">
      <form>
        <button onClick={handleSubmit}>
          <i className="fa fa-search"></i>
        </button>
        <input type="text" value={formState} onChange={handleChange} />
      </form>
    </div>
  );
};

const NavBar = (props) => {
  return (
    <div className="navbar">
      <SearchForm setSearchTerm={props.setSearchTerm} />
      <div className="nav-item">
        <h2>FN</h2>
        <SortButton
          sortParam="firstName"
          sortOrder={props.sortOrder}
          setSortOrder={props.setSortOrder}
        />
      </div>
      <div className="nav-item">
        <h2>LN</h2>
        <SortButton
          sortParam="lastName"
          sortOrder={props.sortOrder}
          setSortOrder={props.setSortOrder}
        />
      </div>
    </div>
  );
};

const Person = (props) => {
  return (
    <div className="person">
      <span>
        <i className="fas fa-square-full"></i>
      </span>
      <span>
        <h3>{props.name}</h3>
      </span>
    </div>
  );
};

const sortByName = (firstOrLast, namesIn) => {
  if (firstOrLast === "lastName") {
    return namesIn.sort((a, b) => {
      if (a.split(" ")[1] > b.split(" ")[1]) {
        return 1;
      } else {
        return -1;
      }
    });
  } else return namesIn.sort();
};

const filterList = (searchTerm) => {
  console.log("filterList...", searchTerm);
  if (searchTerm) {
    const filteredNames = names.filter((entry) =>
      entry.includes(searchTerm.trim())
    );
    console.log(filteredNames);
    return filteredNames;
  } else {
    const filteredNames = names.map((entry) => entry);
    console.log(filteredNames);
    return filteredNames;
  }
};

const PersonsList = (props) => {
  const filteredNames = filterList(props.searchTerm);
  let sortedNames = sortByName(props.sortOrder.sortName, filteredNames);
  if (props.sortOrder.sortDir === "up") {
    sortedNames = sortedNames.reverse();
  }
  console.log("Sorted Names: ", sortedNames);

  const personsList = sortedNames.map((person, index) => (
    <Person key={index} name={person} />
  ));
  return <div className="persons-list">{personsList}</div>;
};

const App = () => {
  const [sortOrder, setSortOrder] = React.useState({
    sortDir: "down",
    sortName: "lastName",
  });
  const [searchTerm, setSearchTerm] = React.useState(null);
  return (
    <div className="container">
      <NavBar
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        setSearchTerm={setSearchTerm}
      />
      <PersonsList sortOrder={sortOrder} searchTerm={searchTerm} />
    </div>
  );
};

export default App;

// ReactDOM.render(<App />, document.getElementById("root"));
