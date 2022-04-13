import dynamic from "next/dynamic";

const CloverIIIF = dynamic(() => import("@samvera/clover-iiif"), {
  ssr: false,
});

const options = {
  showTitle: false,
  showIIIFBadge: true,
}

const customTheme = {
  colors: {
    primary: "#FFFFFF",
    primaryMuted: "#FFFFFF",
    primaryAlt: "#FFFFFF"
  }
};

const Viewer = ({ manifestId }) => <CloverIIIF manifestId={manifestId} options={options} customTheme={customTheme} />;
export default Viewer;
