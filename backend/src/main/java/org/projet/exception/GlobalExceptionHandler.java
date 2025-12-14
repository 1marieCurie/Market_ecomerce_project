package org.projet.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.projet.exception.*;


@ControllerAdvice
public class GlobalExceptionHandler {

    // Conflict 409
    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<String> handleUserAlreadyExists(UserAlreadyExistsException ex) {
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(ex.getMessage());
    }

    // Bad request 400
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgument(IllegalArgumentException ex) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST) // an argument by default
                .body(ex.getMessage());
    }

    // Internal Server Error or fallback 500
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGeneralException(Exception ex) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR) // 500 by defaut this argument
                .body(ex.getMessage());
    }

    // Handle Category Exceptions
    @ExceptionHandler(CategoryAlreadyExistsException.class)
    public ResponseEntity<String> handleCategoryAlreadyExists(CategoryAlreadyExistsException ex) {
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(ex.getMessage());
    }

    @ExceptionHandler(CategoryNotFoundException.class)
    public ResponseEntity<String> handleCategoryNotFound(CategoryNotFoundException ex) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(ex.getMessage());
    }

    @ExceptionHandler(CategoryDeletionNotAllowedException.class)
    public ResponseEntity<String> handleCategoryDeletionNotAllowed(CategoryDeletionNotAllowedException ex) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ex.getMessage());
    }

    // Handle Product Exceptions

@ExceptionHandler(ProductNotFoundException.class)
public ResponseEntity<String> handleProductNotFound(ProductNotFoundException ex) {
    return ResponseEntity
            .status(HttpStatus.NOT_FOUND)
            .body(ex.getMessage());
}

@ExceptionHandler(ProductAlreadyExistsException.class)
public ResponseEntity<String> handleProductAlreadyExists(ProductAlreadyExistsException ex) {
    return ResponseEntity
            .status(HttpStatus.CONFLICT)
            .body(ex.getMessage());
}



}

// this file is found automaticcaly by spring
// it handles the generale exceptions : conflict:409 , bad request 400, internal
// server error : 500,
// not found content : 404, forbidden access : 403, unauthorized : 401 are given
// by defaut by Spring

// To remeber :
// If the error comes from business logic → you handle it
// If the error comes from routing or security → Spring handles it