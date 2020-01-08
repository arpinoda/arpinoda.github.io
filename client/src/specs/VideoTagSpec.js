import React from "react";
import renderer from "react-test-renderer";
import VideoTag from "../components/VideoTag";

describe("<VideoTag />", () => {
  test("Should not break with empty props", () => {
    const component = renderer.create(<VideoTag />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  test("Should display tag", () => {
    const component = renderer.create(<VideoTag isVisible />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });

  test("Should NOT display tag", () => {
    const component = renderer.create(<VideoTag isVisible={false} />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
