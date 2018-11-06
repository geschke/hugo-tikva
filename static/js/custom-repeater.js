/* global jQuery */
/* global wp */


/**
 * Customizer Control: JavaScript part of repeater control
 *
 * @package     azbalac Controls
 * @subpackage  Controls
 * @copyright   Copyright (c) 2017, Ralf Geschke
 * @license     https://opensource.org/licenses/MIT
 * @since       2.0
 */

/**
 * Preload image when using image type in repeater
 * 
 * @param {*} id 
 * @param {*} payload 
 * @param {*} callback 
 */
function azbalacRepeaterPreloadAttachment(id, payload, callback) {
    // if it doesn't have URL we probably have to preload it
    if (!wp.media.attachment(id).get('url')) {
      wp.media.attachment(id).fetch().then(function () {
        callback(wp.media.attachment(id), payload);
      });
      // was:, but what did I want here? element.children('')
      return;
    }
  
    callback(wp.media.attachment(id), payload);
  }

/**
 * Show selected image as preview in a repeater area
 * 
 * @param {*} payload 
 * @param {*} attachment 
 */
function azbalacRepeaterPreviewImage(payload, attachment) {
    var elementId = payload['elementId'];
    var elementName = payload['elementName'];
    
    var mediaView = jQuery('#' + elementId).find("div[data-field='" + elementName + "']");

    var placeholder = jQuery(mediaView).find('.placeholder');
    if (placeholder.length) {
        // placeholder element is available, replace with image
        mediaView.empty();
        var imageTemplate = '<div class="thumbnail thumbnail-image"><img class="attachment-thumb" src="" draggable="false" alt=""></div>';
        imageTemplate += '<div class="actions"><button type="button" class="button remove-button azbalac-repeater-custom-remove-button">' + objectL10n.remove + '</button> <button type="button" class="button upload-button azbalac-repeater-custom-upload-button" id="">' + objectL10n.change_image + '</button>  </div>';
        mediaView.append(imageTemplate);
      
    } 
    var imageUrl = wp.media.attachment(attachment.id).get('url');
    mediaView.find('.attachment-thumb').attr('src',imageUrl).css('display','block'); 

}


/* Generate unique id, taken from https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
*/
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

(function ($) {

   
wp.customize.controlConstructor.azbalac_repeater = wp.customize.Control.extend( {

    

    ready: function() {
        var control = this;
        //this.elementData = {};

        this.container.on( 'event_repeater_updated', function() {
            var dataField = $(control.container).find('.azbalac_repeater_collector');
            var settingData = dataField.val();
         
            control.setting.set( settingData );
            return true;
        });
    
        control.initRepeaterControl();
        
    },


    /**
     * The first control element should not be removed, so hide it's remove button and display
     * all but not the first
     */
    displayRemoveButtons: function() {
        var control = this;
        $(control.container).find('.customize-repeater-row-remove').each(function(idx) {
            if (idx == 0) {
                $(this).hide();
            } else {
                $(this).show();
            }

        });

    },

    /**
     * Find and update hidden data field with collection of values by submitting new elementData array.
     * At the end, this method triggers an event, so WordPress recognizes the changes.
     * 
     */
    updateCurrentDataField: function(elementData) {
        var control = this;
        var dataField = $(control.container).find('.azbalac_repeater_collector');
        
        var dataFieldId = dataField.attr('id');

        $(control.container).find('#' + dataFieldId).val( encodeURI( JSON.stringify( elementData ) ));
        
        dataField.trigger('event_repeater_updated');

    },

    updateCurrentTextField: function(element, elementData, value) {
        var control = this;
        elementId = $(element).parents('.customize-control-repeater-element').attr('id');
        if (elementData[elementId] != undefined) {
          
            var dataField = ($(element).attr('data-field'));
            var dataType = ($(element).attr('data-type'));
              
            if (elementData[elementId]["elements"][dataField] == undefined) {
                elementData[elementId]["elements"][dataField] = {}; 
            }
            elementData[elementId]["elements"][dataField]['type'] = dataType;
            elementData[elementId]["elements"][dataField]['name'] = dataField;
            elementData[elementId]["elements"][dataField]['value'] = value;

            
        }
        /*else {
            console.log("something went wrong here!");
        }*/
      
        control.updateCurrentDataField(elementData);
        control.displayRemoveButtons();
    },

    emptyTemplateEntrySelect: function(selectFields) {
        _.each( selectFields, function( selectField, selectName ) {
        
            if ($(selectField).attr('data-default') != '') {
             
                var selectDefault = $(selectField).attr('data-default');
                $(selectField).children('option').each(function(index, optionElem) {
                    if ($(optionElem).val() == selectDefault) {
                        $(optionElem).attr('selected','selected');
                    }
                });
               
            } else {
                $(selectField).children('option').removeAttr("selected");
            }
        });
    },

    emptyTemplateImage: function(mediaView) {
        // todo: check function with multiple image elements
        mediaView.empty();
        var imageTemplate = '<div class="placeholder">' + objectL10n.no_image_selected + '</div><div class="actions"> <button type="button" class="button azbalac-repeater-custom-upload-button">' + objectL10n.select_image + '</button>      </div>';
        mediaView.append(imageTemplate);
        
    },

    emptyTemplateInputfields: function(inputFields) {
        _.each( inputFields, function( inputField, inputName ) {
        
            if ($(inputField).attr('data-default') != '') {
                $(inputField).val($(inputField).attr('data-default'));
            } else {
                $(inputField).val('');
            }
        });
    },

    onChangeSelectUpdate: function( event, element, elementData ) {
        var control = this;
        
        elementId = element.parents('.customize-control-repeater-element').attr('id');
        
        if (elementData[elementId] != undefined) {
      
            var dataField = element.attr('data-field');
            var dataType = element.attr('data-type');
            if (dataType == 'dropdown-pages' || dataType == 'select') {
             
                var newValue = element.val();
                if (elementData[elementId]["elements"][dataField] == undefined) {
                    elementData[elementId]["elements"][dataField] = {}; 
                }
                elementData[elementId]["elements"][dataField]['type'] = dataType;
                elementData[elementId]["elements"][dataField]['name'] = dataField;
                elementData[elementId]["elements"][dataField]['value'] = newValue;

            }
            
        }
        /*else {
            console.log("something went wrong here!");
        }*/
      
        control.updateCurrentDataField(elementData);
        control.displayRemoveButtons();
                
    },


    initRepeaterControl: function() {
        var control = this;
        var elementData = {};

        var colorPickerOptions = {
            // a callback to fire whenever the color changes to a valid color
            change: function(event, ui){
                var element = event.target;
                var color = ui.color.toString();
             
                control.updateCurrentTextField(element, elementData, color);
            },
            // a callback to fire when the input is emptied or an invalid color
            clear: function(event) {
                var element = jQuery(event.target).siblings('.wp-color-picker')[0];
                var color = '';
        
                if (element) {
                    var color = '';
                    control.updateCurrentTextField(element, elementData, color);
    
                }
            
            }
        };
       

        control.displayRemoveButtons();

        //console.log("in initRepeaterControl");
        var element = $(this.container).find('.customize-control-repeater-element');

     
        // first initialization
        if (element.length > 1) {
            // preinitialized elements available?
         
            element = $(element[0]); // get first element as template 
        
        } 
       
        var prevValue = $(control.container).find('.azbalac_repeater_collector').val();

        if (typeof prevValue != 'undefined' && prevValue != '') {
            elementData = JSON.parse(decodeURI(prevValue));
          
        } else {
            
            elementData[element.attr('id')] = {
                elements: {}
            };
        }

       
      
        // initialize button events
        var newButton = $(this.container).find('.customize-repeater-new-field');
        newButton.on('click',function() {
            var newElement = element.clone();
            var newId = uuidv4();

            newElement.attr('id',newId);
            // clear input fields, replace with default, if available
            var inputFields = newElement.find('.customize-repeater-input-text');
            control.emptyTemplateInputfields(inputFields);

          
            // empty textarea content or set default
            var inputFields = newElement.find('.customize-repeater-input-textarea');
            control.emptyTemplateInputfields(inputFields);
            
            var selectFields = newElement.find('.customize-repeater-input-select');
            control.emptyTemplateEntrySelect(selectFields);
            selectFields = newElement.find('.customize-repeater-input-dropdownpages');
            control.emptyTemplateEntrySelect(selectFields);
            // empty image element content
            var mediaView = newElement.find('.attachment-media-view');
            if (mediaView.length) {
                control.emptyTemplateImage(mediaView);
            }
            // empty colorpicker element and set events
            var colorpicker = newElement.find('.wp-picker-container');
            var colorpickerContainer = colorpicker.parent();
            var colorpickerInput = newElement.find('.azbalac-repeater-color-field').prop('outerHTML');
            colorpicker.remove();
            colorpickerContainer.append(colorpickerInput);
            newElement.find('.azbalac-repeater-color-field').wpColorPicker(colorPickerOptions);
            
            // empty radio button elements and set new names for radio button group based on element id
            var radioContainer = newElement.find('.customize-control-radio-container');
            if (radioContainer.length) {
              
                _.each( radioContainer, function( radioContainerElement, rcIndex ) {
                    var dataFieldName = $(radioContainerElement).attr('data-field');
                
                    var radioName = '_customize-control-repeater-radio-' + dataFieldName + '-' + newId;
                    var radioInputElement = $(radioContainerElement).find('.azbalac-customize-repeater-input-radio');
                    _.each( radioInputElement, function(radioInputItem, rcItemIndex ){
                        //console.log(radioInputItem);
                        $(radioInputItem).attr('name',radioName);

                    });

                });
                    

            }

            // todo: check checkbox elements


            newElement.appendTo($('.customize-control-repeater-element-container'));
            elementData[newId] = {
                elements: {}
            };
         
            control.updateCurrentDataField(elementData);
            control.displayRemoveButtons();
          
        });

        $(document).on('click', '.customize-repeater-row-remove', function () {
        
            var removeElem = $(this).parents('.customize-control-repeater-element');
            var removeId = removeElem.attr('id');
    
            removeElem.remove();
         
            elementData = _.omit(elementData,removeId);

            // todo: clear textareaOldval... maybe clear all temporary variables in another method?

            control.updateCurrentDataField(elementData);

            control.displayRemoveButtons();

        });

        // initialize key events to handle input fields
        $(document).on('keyup', '.customize-repeater-input-text', function () {
           
            elementId = $(this).parents('.customize-control-repeater-element').attr('id');
            if (elementData[elementId] != undefined) {
             
                var dataField = ($(this).attr('data-field'));
                var dataType = ($(this).attr('data-type'));
                var newValue = $(this).val();
                if (elementData[elementId]["elements"][dataField] == undefined) {
                    elementData[elementId]["elements"][dataField] = {}; 
                }
                elementData[elementId]["elements"][dataField]['type'] = dataType;
                elementData[elementId]["elements"][dataField]['name'] = dataField;
                elementData[elementId]["elements"][dataField]['value'] = newValue;
                
            }
            /*else {
                console.log("something went wrong here!");
            }*/
        
            control.updateCurrentDataField(elementData);
            control.displayRemoveButtons();
            
        });


        // initialize key events to handle input fields
        var textareaOldval = {};
        $(document).on('change keyup paste', '.customize-repeater-input-textarea', function () {
         
            elementId = $(this).parents('.customize-control-repeater-element').attr('id');

            var currentVal = $(this).val();
        
            if(typeof textareaOldval[elementId] != undefined && currentVal == textareaOldval[elementId]) {
                return; //check to prevent multiple simultaneous triggers
            }
        
            textareaOldval[elementId] = currentVal;

            if (elementData[elementId] != undefined) {

                var dataField = ($(this).attr('data-field'));
                var dataType = ($(this).attr('data-type'));
              
                var newValue = $(this).val();
              
                if (elementData[elementId]["elements"][dataField] == undefined) {
                    elementData[elementId]["elements"][dataField] = {}; 
                }
                elementData[elementId]["elements"][dataField]['type'] = dataType;
                elementData[elementId]["elements"][dataField]['name'] = dataField;
                elementData[elementId]["elements"][dataField]['value'] = newValue;


            }
            /*else {
                console.log("something went wrong here!");
            }*/

            control.updateCurrentDataField(elementData);
            control.displayRemoveButtons();
            
        });


        var custom_uploader;

        $(document).on('click', '.azbalac-repeater-custom-upload-button', function(e) {
            elementId = $(this).parents('.customize-control-repeater-element').attr('id');
            var mediaView = $(this).parents('.attachment-media-view');

            if (elementData[elementId] != undefined) {
                var dataField = ($(this).parents('.attachment-media-view').attr('data-field'));
                var dataType = ($(this).parents('.attachment-media-view').attr('data-type'));
             
            }
            else {
                console.log("elementData undefined!");
            }
        

            e.preventDefault();
    
            //If the uploader object has already been created, reopen the dialog
            if (custom_uploader) {
                custom_uploader.open();
                return;
            }
    
            //Extend the wp.media object
            custom_uploader = wp.media.frames.file_frame = wp.media({
                title:  objectL10n.choose_image,
                button: {
                    text:  objectL10n.choose_image
                },
                multiple: false
            });
    
            //When a file is selected, grab the URL and set it as the text field's value
            custom_uploader.on('select', function() {
                attachment = custom_uploader.state().get('selection').first().toJSON();
              
                var payload = [];
                payload['elementId'] = elementId;
                payload['elementName'] = dataField;
                azbalacRepeaterPreviewImage(payload, attachment);
                
                if (elementData[elementId]["elements"][dataField] == undefined) {
                    elementData[elementId]["elements"][dataField] = {}; 
                }
                elementData[elementId]["elements"][dataField]['type'] = dataType;
                elementData[elementId]["elements"][dataField]['name'] = dataField;
                elementData[elementId]["elements"][dataField]['value'] = attachment.id;

                control.updateCurrentDataField(elementData);
                control.displayRemoveButtons();

                //} else {
                //    return _orig_send_attachment.apply( button_id, [props, attachment] );
                //}


            });
    
            //Open the uploader dialog
            custom_uploader.open();
    
        });

        $(document).on('click', '.azbalac-repeater-custom-remove-button', function(e) {
            elementId = $(this).parents('.customize-control-repeater-element').attr('id');
            var mediaView = $(this).parents('.attachment-media-view');
        
            var dataField = ($(this).parents('.attachment-media-view').attr('data-field'));
            var dataType = ($(this).parents('.attachment-media-view').attr('data-type'));
       

            mediaView.empty();

            var imageTemplate = '<div class="placeholder">' + objectL10n.no_image_selected + '</div><div class="actions"> <button type="button" class="button azbalac-repeater-custom-upload-button">' + objectL10n.select_image + '</button>      </div>';
            mediaView.append(imageTemplate);

            elementData[elementId]["elements"][dataField] = {}; 
            control.updateCurrentDataField(elementData);
            

        });
        
          
        $('.azbalac-repeater-color-field').wpColorPicker(colorPickerOptions);
         
         
         $(document).on('change', '.azbalac-customize-repeater-input-checkbox', function () {
            
            elementId = $(this).parents('.customize-control-repeater-element').attr('id');
            if (elementData[elementId] != undefined) {
               
                var dataField = ($(this).attr('data-field'));
                var dataType = ($(this).attr('data-type'));
              
                var newValue = '';
                if (this.checked === true) {
                    newValue = '1';
                }

                if (elementData[elementId]["elements"][dataField] == undefined) {
                    elementData[elementId]["elements"][dataField] = {}; 
                }
                elementData[elementId]["elements"][dataField]['type'] = dataType;
                elementData[elementId]["elements"][dataField]['name'] = dataField;
                elementData[elementId]["elements"][dataField]['value'] = newValue;

            }
            /*else {
                console.log("something went wrong here!");
            }*/

            control.updateCurrentDataField(elementData);
            control.displayRemoveButtons();

        });

        $(document).on('change', '.azbalac-customize-repeater-input-radio', function () {
          
            var radioName = $(this).attr('name');
            var newValue = $( "input[type=radio][name=" + radioName + " ]:checked" ).val();
           
            elementId = $(this).parents('.customize-control-repeater-element').attr('id');
            if (elementData[elementId] != undefined) {
              
                var dataField = ($(this).parents('.customize-control-radio-container').attr('data-field'));
                var dataType = ($(this).parents('.customize-control-radio-container').attr('data-type'));
               
                if (elementData[elementId]["elements"][dataField] == undefined) {
                    elementData[elementId]["elements"][dataField] = {}; 
                }
                elementData[elementId]["elements"][dataField]['type'] = dataType;
                elementData[elementId]["elements"][dataField]['name'] = dataField;
                elementData[elementId]["elements"][dataField]['value'] = newValue;

            }
            /*else {
                console.log("something went wrong here!");
            }*/

            control.updateCurrentDataField(elementData);
            control.displayRemoveButtons();
            
        });



        // initialize key events to handle select fields
       
        $(document).on('change', '.customize-repeater-input-select', function (event) {
            control.onChangeSelectUpdate(event, $(this), elementData);
        });
       
        $(document).on('change', '.customize-repeater-input-dropdownpages', function (event) {
            control.onChangeSelectUpdate(event, $(this), elementData);
        });
        

    }


} );
  

})(jQuery);