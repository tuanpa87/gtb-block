(function(blocks, element, editor, components) {
  var el = element.createElement;
  var registerBlockType = blocks.registerBlockType;
  var MediaUpload = editor.MediaUpload;
  var Button = components.Button;
  registerBlockType('img-block/main', {
    title: 'IMG',
    icon: 'heart',
    category: 'common',
    attributes: {
      pc: {
        imageAlt: {
          attribute: 'alt',
          selector: '.img-pc'
        },
        imageUrl: {
          attribute: 'src',
          selector: '.img-pc'
        }
      },
      sp: {
        imageAlt: {
          attribute: 'alt',
          selector: '.img-sp'
        },
        imageUrl: {
          attribute: 'src',
          selector: '.img-sp'
        }
      }
    },
    
    edit: function edit(props) {
      var attributes = props.attributes,
          className = props.className,
          setAttributes = props.setAttributes;
  
      var getImageButton = function getImagePcButton(bp, openEvent) {
        var bpAttributes;

        if (bp == "sp") {
          bpAttributes= attributes.sp;
        } else {
          bpAttributes= attributes.pc;
        }

        if (bpAttributes) {
          return el("img", {
            src: bpAttributes.imageUrl,
            onClick: openEvent,
            className: "image"
          });
        } else {
          return el("div", {
            className: "button-container"
          }, el(Button, {
            onClick: openEvent,
            className: "button button-large"
          }, "Pick an image"));
        }
      };
  
  
      return el("div", {
        className: "container"
      }, el("div", {
        className: "img-upload-pc"
      }, el("p", null, " Select image for pc "), el(MediaUpload, {
        onSelect: function onSelect(media) {
          setAttributes({
            pc: {
              imageAlt: media.alt,
              imageUrl: media.url
            }
          });
        },
        type: "image",
        value: attributes.imageID,
        render: function render(_obj) {
          var open = _obj.open;
          return getImageButton("pc" , open);
        }
      })), el("br", null), el("div", {
        className: "img-upload-sp"
      }, el("p", null, " Select image for smartphone "), el(MediaUpload, {
        onSelect: function onSelect(media) {
          setAttributes({
            sp: {
              imageAlt: media.alt,
              imageUrl: media.url
            }
          });
        },
        type: "image",
        value: attributes.imageID,
        render: function render(_obj) {
          var open = _obj.open;
          return getImageButton("sp" ,open);
        }
      })));
    },

    save: function save(props) {
      var attributes = props.attributes;
  
      var cardRender = function cardPc(bp, src, alt) {
        if (!src) return null;
        var className = "img-fluid";

        if (bp == "sp") {
          className = className +" img-sp"
        } else {
          className = className +" img-pc"
        }
  
        if (alt) {
          return el("img", {
            className: className,
            src: src,
            alt: alt
          });
        } // No alt set, so let's hide it from screen readers
  
        return el("img", {
          className: className,
          src: src,
          alt: "",
          "aria-hidden": "true"
        });
      };
  
  
      return el("div", {
        className: "card"
      }, el("div", {
        className: "d-none d-md-block"
      }, cardRender("pc" ,attributes.pc.imageUrl, attributes.pc.imageAlt)), el("div", {
        className: "d-block d-md-none"
      }, cardRender("sp" , attributes.sp.imageUrl, attributes.sp.imageAlt)));
    }
  });

})(window.wp.blocks, window.wp.element, window.wp.editor, window.wp.components);


// (function(blocks, element, editor, components) {
//   var el = element.createElement;
//   var registerBlockType = blocks.registerBlockType;
//   var MediaUpload = editor.MediaUpload;
//   var Button = components.Button;
//   registerBlockType('img-block/main', {
//     title: 'IMG',
//     icon: 'heart',
//     category: 'common',
//     attributes: {
//       pc: {
//         imageAlt: {
//           attribute: 'alt',
//           selector: '.img-pc'
//         },
//         imageUrl: {
//           attribute: 'src',
//           selector: '.img-pc'
//         }
//       },
//       sp: {
//         imageAlt: {
//           attribute: 'alt',
//           selector: '.img-sp'
//         },
//         imageUrl: {
//           attribute: 'src',
//           selector: '.img-sp'
//         }
//       }
//     },
    
//     edit: function edit(props) {
//       var attributes = props.attributes,
//           className = props.className,
//           setAttributes = props.setAttributes;
  
//       var getImagePcButton = function getImagePcButton(openEvent) {
//         if (attributes.pc) {
//           return el("img", {
//             src: attributes.pc.imageUrl,
//             onClick: openEvent,
//             className: "image"
//           });
//         } else {
//           return el("div", {
//             className: "button-container"
//           }, el(Button, {
//             onClick: openEvent,
//             className: "button button-large"
//           }, "Pick an image"));
//         }
//       };
  
//       var getImageSpButton = function getImageSpButton(openEvent) {
//         if (attributes.sp) {
//           return el("img", {
//             src: attributes.sp.imageUrl,
//             onClick: openEvent,
//             className: "image"
//           });
//         } else {
//           return el("div", {
//             className: "button-container"
//           }, el(Button, {
//             onClick: openEvent,
//             className: "button button-large"
//           }, "Pick an image"));
//         }
//       };
  
//       return el("div", {
//         className: "container"
//       }, el("div", {
//         className: "img-upload-pc"
//       }, el("p", null, " Select image for pc "), el(MediaUpload, {
//         onSelect: function onSelect(media) {
//           setAttributes({
//             pc: {
//               imageAlt: media.alt,
//               imageUrl: media.url
//             }
//           });
//         },
//         type: "image",
//         value: attributes.imageID,
//         render: function render(_obj) {
//           var open = _obj.open;
//           return getImagePcButton(open);
//         }
//       })), el("br", null), el("div", {
//         className: "img-upload-sp"
//       }, el("p", null, " Select image for smartphone "), el(MediaUpload, {
//         onSelect: function onSelect(media) {
//           setAttributes({
//             sp: {
//               imageAlt: media.alt,
//               imageUrl: media.url
//             }
//           });
//         },
//         type: "image",
//         value: attributes.imageID,
//         render: function render(_obj) {
//           var open = _obj.open;
//           return getImageSpButton(open);
//         }
//       })));
//     },

//     save: function save(props) {
//       var attributes = props.attributes;
  
//       var cardPc = function cardPc(src, alt) {
//         if (!src) return null;
  
//         if (alt) {
//           return el("img", {
//             className: "img-fluid img-pc",
//             src: src,
//             alt: alt
//           });
//         } // No alt set, so let's hide it from screen readers
  
  
//         return el("img", {
//           className: "img-fluid img-pc" ,
//           src: src,
//           alt: "",
//           "aria-hidden": "true"
//         });
//       };
  
//       var cardSp = function cardSp(src, alt) {
//         if (!src) return null;
  
//         if (alt) {
//           return el("img", {
//             className: "img-fluid img-sp",
//             src: src,
//             alt: alt
//           });
//         } // No alt set, so let's hide it from screen readers
  
  
//         return el("img", {
//           className: "img-fluid img-sp",
//           src: src,
//           alt: "",
//           "aria-hidden": "true"
//         });
//       };
  
//       return el("div", {
//         className: "card"
//       }, el("div", {
//         className: "d-none d-md-block"
//       }, cardPc(attributes.pc.imageUrl, attributes.pc.imageAlt)), el("div", {
//         className: "d-block d-md-none"
//       }, cardSp(attributes.sp.imageUrl, attributes.sp.imageAlt)));
//     }
//   });

// })(window.wp.blocks, window.wp.element,window.wp.editor, window.wp.components);




/* ES Next */

// const { RichText, MediaUpload, PlainText } = wp.editor;
// const { registerBlockType } = wp.blocks;
// const { Button } = wp.components;

// registerBlockType('img-block/main', {   
//   title: 'Img',
//   icon: 'heart',
//   category: 'common',
//   attributes: {
//   	pc: { 
//        imageAlt: {
//         attribute: 'alt',
//         selector: '.img-pc'
//       },
//       imageUrl: {
//         attribute: 'src',
//         selector: '.img-pc'
//       }
//     },
//     sp: { 
//        imageAlt: {
//         attribute: 'alt',
//         selector: '.img-sp'
//       },
//       imageUrl: {
//         attribute: 'src',
//         selector: '.img-sp'
//       }
//     }
//   },
//   edit({ attributes, className, setAttributes }) {
//     const getImagePcButton = (openEvent) => {
//       if(attributes.pc.imageUrl) {
//         return (
//           <img 
//             src={ attributes.pc.imageUrl }
//             onClick={ openEvent }
//             className="image"
//           />
//         );
//       }
//       else {
//         return (
//           <div className="button-container">
//             <Button 
//               onClick={ openEvent }
//               className="button button-large"
//             >
//               Pick an image
//             </Button>
//           </div>
//         );
//       }
//     };
    
//   	const getImageSpButton = (openEvent) => {
//       if(attributes.sp.imageUrl) {
//         return (
//           <img 
//             src={ attributes.sp.imageUrl }
//             onClick={ openEvent }
//             className="image"
//           />
//         );
//       }
//       else {
//         return (
//           <div className="button-container">
//             <Button 
//               onClick={ openEvent }
//               className="button button-large"
//             >
//               Pick an image
//             </Button>
//           </div>
//         );
//       }
//     };

//     return (
//       <div className="container">
//         <div className="img-upload-pc">
//           <p> Select image for pc </p>
//           <MediaUpload
//             onSelect={ media => { setAttributes({pc: { imageAlt: media.alt, imageUrl: media.url }}); } }
//             type="image"
//             value={ attributes.imageID }
//             render={ ({ open }) => getImagePcButton(open) }
//           />
//         </div>
        
//         <br/>
        
//          <div className="img-upload-sp">
//           <p> Select image for smartphone </p>
//           <MediaUpload
//             onSelect={ media => { setAttributes({sp: { imageAlt: media.alt, imageUrl: media.url }}); } }
//             type="image"
//             value={ attributes.imageID }
//             render={ ({ open }) => getImageSpButton(open) }
//           />
//         </div>
//       </div>
//     );
//   },

//   save({ attributes }) {
//   	const cardPc = (src, alt) => {
//       if(!src) return null;

//       if(alt) {
//         return (
//           <img 
//             className="img-fluid" 
//             src={ src }
//             alt={ alt }
//           /> 
//         );
//       }
      
//       // No alt set, so let's hide it from screen readers
//       return (
//         <img 
//           className="img-fluid img-pc" 
//           src={ src }
//           alt=""
//           aria-hidden="true"
//         /> 
//       );
//     };
    
//       const cardSp = (src, alt) => {
//       if(!src) return null;

//       if(alt) {
//         return (
//           <img 
//             className="img-fluid img-sp" 
//             src={ src }
//             alt={ alt }
//           /> 
//         );
//       }
      
//       // No alt set, so let's hide it from screen readers
//       return (
//         <img 
//           className="img-fluid" 
//           src={ src }
//           alt=""
//           aria-hidden="true"
//         /> 
//       );
//     };
    
//     return (
//       <div className="card">
//         <div className="d-none d-md-block">
//         { cardPc(attributes.pc.imageUrl, attributes.pc.imageAlt) }
//         </div>
//         <div className="d-block d-md-none">
//         { cardSp(attributes.sp.imageUrl, attributes.sp.imageAlt) }
//         </div> 
//       </div>
//     );
//   }
// });




/* ES Next Opt */

// const { RichText, MediaUpload, PlainText } = wp.editor;
// const { registerBlockType } = wp.blocks;
// const { Button } = wp.components;

// registerBlockType('img-block/main', {   
//   title: 'Img',
//   icon: 'heart',
//   category: 'common',
//   attributes: {
//   	pc: { 
//        imageAlt: {
//         attribute: 'alt',
//         selector: '.img-pc'
//       },
//       imageUrl: {
//         attribute: 'src',
//         selector: '.img-pc'
//       }
//     },
//     sp: { 
//        imageAlt: {
//         attribute: 'alt',
//         selector: '.img-sp'
//       },
//       imageUrl: {
//         attribute: 'src',
//         selector: '.img-sp'
//       }
//     }
//   },
//   edit({ attributes, className, setAttributes }) {
//     const getImageButton = (bp ,openEvent) => {
      
//        var bpAttributes;
//         if (bp == "sp") {
//           bpAttributes= attributes.sp;
//         } else {
//           bpAttributes= attributes.pc;
//         }
      
//       if(bpAttributes) {
//         return (
//           <img 
//             src={ bpAttributes.imageUrl }
//             onClick={ openEvent }
//             className="image"
//           />
//         );
//       }
//       else {
//         return (
//           <div className="button-container">
//             <Button 
//               onClick={ openEvent }
//               className="button button-large"
//             >
//               Pick an image
//             </Button>
//           </div>
//         );
//       }
//     };

//     return (
//       <div className="container">
//         <div className="img-upload-pc">
//           <p> Select image for pc </p>
//           <MediaUpload
//             onSelect={ media => { setAttributes({pc: { imageAlt: media.alt, imageUrl: media.url }}); } }
//             type="image"
//             value={ attributes.imageID }
//             render={ ({ open }) => getImageButton("pc", open) }
//           />
//         </div>
        
//         <br/>
        
//          <div className="img-upload-sp">
//           <p> Select image for smartphone </p>
//           <MediaUpload
//             onSelect={ media => { setAttributes({sp: { imageAlt: media.alt, imageUrl: media.url }}); } }
//             type="image"
//             value={ attributes.imageID }
//             render={ ({ open }) => getImageButton("sp" ,open) }
//           />
//         </div>
//       </div>
//     );
//   },

//   save({ attributes }) {
//   	const cardRender = (bp ,src, alt) => {
//       if(!src) return null;
      
//       let className = "img-fluid";
//        if (bp == "sp") {
//           className += " img-sp"
//         } else {
//           className += " img-pc"
//         }

//       if(alt) {
//         return (
//           <img 
//             className= {className}
//             src={ src }
//             alt={ alt }
//           /> 
//         );
//       }
      
//       // No alt set, so let's hide it from screen readers
//       return (
//         <img 
//           className= {className }
//           src={ src }
//           alt=""
//           aria-hidden="true"
//         /> 
//       );
//     };
    
//     return (
//       <div className="card">
//         <div className="d-none d-md-block">
//         { cardRender('pc',attributes.pc.imageUrl, attributes.pc.imageAlt) }
//         </div>
//         <div className="d-block d-md-none">
//         { cardRender('sp',attributes.sp.imageUrl, attributes.sp.imageAlt) }
//         </div> 
//       </div>
//     );
//   }
// });

