import React from "react";

const Heading = ({title}) => {
  return (
    <div>
      <h2 class="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-4xl lg:text-4xl">
        {title}
      </h2>
      <p class="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400"></p>
    </div>
  );
};

export default Heading;
