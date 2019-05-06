/* ES Next Opt */
const { RichText, MediaUpload, PlainText } = wp.editor;
const { registerBlockType } = wp.blocks;
const { Button, TabPanel } = wp.components;
const { Fragment } = wp.element;

registerBlockType("img-block/main", {
  title: "Img",
  icon: "heart",
  category: "common",
  attributes: {
    pc: {
      imageAlt: {
        attribute: "alt",
        selector: ".img-pc"
      },
      imageUrl: {
        attribute: "src",
        selector: ".img-pc"
      }
    },
    sp: {
      imageAlt: {
        attribute: "alt",
        selector: ".img-sp"
      },
      imageUrl: {
        attribute: "src",
        selector: ".img-sp"
      }
    }
  },
  edit({ attributes, className, setAttributes }) {
    // const onSelectTab = ( tabName ) => {
    //     console.log( 'Selecting tab', tabName );
    // };

    const getImageButton = (bp, openEvent) => {
      var bpAttributes;
      if (bp == "sp") {
        bpAttributes = attributes.sp;
      } else {
        bpAttributes = attributes.pc;
      }

      if (bpAttributes) {
        return (
          <img
            src={bpAttributes.imageUrl}
            onClick={openEvent}
            className="image"
          />
        );
      } else {
        return (
          <div className="button-container">
            <Button onClick={openEvent} className="button button-large">
              Pick an image
            </Button>
          </div>
        );
      }
    };

    return (
      <TabPanel
        className="block-img-container"
        //onSelect={ onSelectTab }
        tabs={[
          {
            name: "pc",
            title: "PC",
            className: "img-upload-pc"
          },
          {
            name: "sp",
            title: "SP",
            className: "img-upload-sp"
          }
        ]}
      >
        {tab => (
          <div>
            {tab.name === "pc" ? (
              <Fragment>
                <p> Select image for pc </p>
                <MediaUpload
                  onSelect={media => {
                    setAttributes({
                      pc: { imageAlt: media.alt, imageUrl: media.url }
                    });
                  }}
                  type="image"
                  value={attributes.imageID}
                  render={({ open }) => getImageButton("pc", open)}
                />
              </Fragment>
            ) : (
              <Fragment>
                <p> Select image for smartphone </p>
                <MediaUpload
                  onSelect={media => {
                    setAttributes({
                      sp: { imageAlt: media.alt, imageUrl: media.url }
                    });
                  }}
                  type="image"
                  value={attributes.imageID}
                  render={({ open }) => getImageButton("sp", open)}
                />
              </Fragment>
            )}
          </div>
        )}
      </TabPanel>
    );
  },

  save({ attributes }) {
    let imgBlock;
    const cardRender = bp => {
      let className = "img-fluid",
        src,
        alt;
      if (bp == "sp") {
        className += " img-sp";
        src = attributes.sp.imageUrl;
        alt = attributes.sp.imageAlt;
      } else {
        className += " img-pc";
        src = attributes.pc.imageUrl;
        alt = attributes.pc.imageAlt;
      }

      if (!src) return null;

      if (alt) {
        return <img className={className} src={src} alt={alt} />;
      }

      // No alt set, so let's hide it from screen readers
      return <img className={className} src={src} alt="" aria-hidden="true" />;
    };

    if (attributes.pc && attributes.sp) {
      imgBlock = (
        <div className="card">
          <div className="d-none d-md-block">{cardRender("pc")}</div>
          <div className="d-block d-md-none">{cardRender("sp")}</div>
        </div>
      );
    } else if (attributes.pc && !attributes.sp) {
      imgBlock = <div className="card">{cardRender("pc")}</div>;
    } else if (!attributes.pc && attributes.sp) {
      imgBlock = <div className="card">{cardRender("sp")}</div>;
    } else {
      imgBlock = null;
    }

    return imgBlock;
  }
});
