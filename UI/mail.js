const writeMail = document.querySelector('.write-message');
const inboxMessage = document.querySelectorAll('.inbox-message');
const main = document.querySelector('.main__container');
const sectionInbox = document.querySelector('.section__inbox');
const header = document.querySelector('.header__container');
const headerDiv = document.querySelectorAll('.header__div');
const readMailSection = document.querySelector('.section__readmail');
const sendReply = document.querySelector('.reply-message');
const asideToggle = document.querySelector('.js-control-aside-tab');
const asideButton = document.querySelectorAll('.aside__button');
const asideContainer = document.querySelector('.aside__container');
const cancelSideTab = document.querySelector('.cancel-side-bar');
const sentMailButton = document.querySelector('#sent-mail-button');
const sectionSentMessages = document.querySelector('.section__sentmessages');
const inboxMailButton = document.querySelector('#inbox-mail-button');
const draftButton = document.querySelector('#draft-button');
const sectionDraftMail = document.querySelector('.section__draftmail');
const drafts = document.querySelectorAll('.draft');
const sentMessages = document.querySelectorAll('.sent-message');
const readSentMail = document.querySelector('.section__readsentmail');
const readDraft = document.querySelector('.section__readdraft');
const editDraftForm = document.querySelector('.draft-edit');


const closeButton = document.createElement('button');
const saveButton = document.createElement('button');
const editButton = document.createElement('button');
const deleteButton = document.createElement('button');
const replyButton = document.createElement('button');
const closeInmailButton = document.createElement('button');
const receiverLabel = document.createElement('label');
const subjectLabel = document.createElement('label');
const messageLabel = document.createElement('label');
const receiverAddress = document.createElement('input');
const subject = document.createElement('input');
const outGoingMessage = document.createElement('textarea');
const retractButton = document.createElement('button');
const closeSentMailButton = document.createElement('button');
const closeDraftButton = document.createElement('button');
    
let openSideBar = true;

removeInboxMessage = () => {
    sectionInbox.style.display = 'none';
}
addInboxMessage = () => {
    sectionInbox.style.display = 'block';
}
addSentMessage = () => {
    sectionSentMessages.style.display = 'grid';
}
addDraft = () => {
    sectionDraftMail.style.display = 'grid';
}
removeInboxHeader = () => {
    Array.from(headerDiv, div => {
        div.remove();
    })
}
addInboxHeader = () => {
    Array.from(headerDiv, div => {
        header.append(div);
    })
}

removeWriteHeader = () => {
    header.removeChild(closeButton);
    header.removeChild(saveButton);
    header.removeChild(sendButton);
}
addWriteHeader = () => {
    header.appendChild(closeButton);
    header.appendChild(saveButton);
    header.appendChild(sendButton);
}
//to enable sending message to people. 
//The function creates a box in your main 
//where you can write mails, send it or save
//it as draft
composeBox = () => {
    //Removing elements from the head
    removeInboxMessage();
    removeInboxHeader();
    //adding text values to elements
    receiverLabel.textContent = 'To:'; 
    subjectLabel.textContent = 'Subject:'; 
    messageLabel.textContent = 'Message:'; 
    closeButton.textContent = 'Close';
    sendButton.textContent = 'Send';
    saveButton.textContent = 'Save';
    //adding text values ends here

    //adding attributes to elements
    receiverAddress.classList.add('input-address');
    subject.classList.add('input-address');
    outGoingMessage.classList.add('message-box');
    closeButton.classList.add('header__button', 'header__closeButton');
    sendButton.setAttribute('class', 'header__button');
    saveButton.setAttribute('class', 'header__button');
    //stopped adding attributes

    //creates the box header
    addWriteHeader(); 
    main.append(receiverLabel);
    main.appendChild(receiverAddress);
    main.append(subjectLabel);
    main.appendChild(subject);
    main.append(messageLabel);
    main.appendChild(outGoingMessage);

    //calls the button from the dom after it is created 
    //and adds event listeners to them
    const closeMail = document.querySelector('.header__closeButton')
    closeMail.addEventListener('click', closeWriteBox, false);
}

closeWriteBox = () => {
    removeWriteHeader();
    main.removeChild(receiverAddress);
    main.removeChild(subject);
    main.removeChild(outGoingMessage);
    main.removeChild(receiverLabel);
    main.removeChild(subjectLabel);
    main.removeChild(messageLabel);
    addInboxHeader();
    addInboxMessage();
}   
addReadMailHeader = () => {
    deleteButton.textContent = 'Delete';
    replyButton.textContent = 'Reply';
    deleteButton.classList.add('header__button');
    replyButton.classList.add('header__button');
    header.append(closeInmailButton);
    header.append(deleteButton);
    header.append(replyButton);
}
addSentMailHeader = () => {
    deleteButton.textContent = 'Delete';
    retractButton.textContent = 'Retract';
    deleteButton.classList.add('header__button');
    retractButton.classList.add('header__button');
    header.append(closeSentMailButton);
    header.append(deleteButton);
    header.append(retractButton);
}
addDraftHeader = () => {
    deleteButton.textContent = 'Delete';
    editButton.textContent = 'Edit';
    deleteButton.classList.add('header__button');
    editButton.classList.add('header__button');
    header.append(closeDraftButton);
    header.append(deleteButton);
    header.append(editButton);
}
closeReadMail = () => {
    header.removeChild(closeInmailButton);
    header.removeChild(deleteButton);
    header.removeChild(replyButton);
    addInboxHeader();
    addInboxMessage();
    sendReply.style.display = 'none';
    readMailSection.style.display = 'none';
    return;
}
closeSentMail = () => {
    header.removeChild(closeSentMailButton);
    header.removeChild(deleteButton);
    header.removeChild(retractButton);
    addInboxHeader();
    addSentMessage();
    readSentMail.style.display = 'none';
    return;
}
closeDraft = () => {
    header.removeChild(closeDraftButton);
    header.removeChild(deleteButton);
    header.removeChild(editButton);
    addInboxHeader();
    addDraft();
    readDraft.style.display = 'none';
    return;
}
editDraft = () => {
    editDraftForm.style.display = 'grid';
}

replyMail = () => {
    return sendReply.style.display = 'grid';
}
Array.from(inboxMessage, message => {
    message.addEventListener('click',() => {
        if (openSideBar) {
            removeInboxMessage();
            removeInboxHeader();
            addReadMailHeader();
            readMailSection.style.display = 'grid';
            closeInmailButton.textContent = 'Close';
            closeInmailButton.classList.add('header__button', 'header__closeButton');
            closeInmailButton.addEventListener('click', closeReadMail, false);
            replyButton.addEventListener('click', replyMail, false);
        }
    });
});
Array.from(sentMessages, sent => {
    sent.addEventListener('click',() => {
        if (openSideBar) {
            sectionSentMessages.style.display = 'none';
            removeInboxHeader();
            addSentMailHeader();
            readSentMail.style.display = 'grid';
            closeSentMailButton.textContent = 'Close';
            closeSentMailButton.classList.add('header__button', 'header__closeButton');
            closeSentMailButton.addEventListener('click', closeSentMail, false);
        }
    });
});
Array.from(drafts, draft => {
    draft.addEventListener('click',() => {
        if (openSideBar) {
            sectionDraftMail.style.display = 'none';;
            removeInboxHeader();
            addDraftHeader();
            readDraft.style.display = 'grid';
            closeDraftButton.textContent = 'Close';
            closeDraftButton.classList.add('header__button', 'header__closeButton');
            closeDraftButton.addEventListener('click', closeDraft, false);
            editButton.addEventListener('click',editDraft, false);
        }
    });
});

openAsideTab = () => {
    asideContainer.style.width = '250px';
    return openSideBar = false;
} 
closeAsideTab = () => {
    asideContainer.style.width = '0';
    return openSideBar = true;
}
sentMail = () => {
    sectionSentMessages.style.display = 'grid';
    sectionInbox.style.display = 'none';
    sectionDraftMail.style.display = 'none';
}
draft = () => {
    sectionDraftMail.style.display = 'grid';
    sectionInbox.style.display = 'none';
    sectionSentMessages.style.display = 'none';
}
inboxMail = () => {
    sectionSentMessages.style.display = 'none';
    sectionInbox.style.display = 'grid';
    sectionDraftMail.style.display = 'none';
}

writeMail.addEventListener('click', composeBox, false);
asideToggle.addEventListener('click', openAsideTab, false);
cancelSideTab.addEventListener('click', closeAsideTab, false);
sentMailButton.addEventListener('click', sentMail, false);
inboxMailButton.addEventListener('click', inboxMail, false);
draftButton.addEventListener('click', draft, false);